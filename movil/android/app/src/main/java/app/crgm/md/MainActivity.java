package app.crgm.md;

import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.provider.OpenableColumns;
import android.webkit.ValueCallback;

import com.getcapacitor.BridgeActivity;

import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

/**
 * Cuando el sistema abre esta app con un .md/.txt (intent-filter en el
 * AndroidManifest), se lee el archivo aqui y se entrega al mismo puente
 * que ya usa la pagina para abrir archivos: window.plantilla.fijar(...).
 */
public class MainActivity extends BridgeActivity {

  private static final int INTENTOS_MAXIMOS = 40;

  @Override
  protected void onCreate(Bundle savedInstanceState){
    super.onCreate(savedInstanceState);
    manejarIntentDeApertura(getIntent());
  }

  @Override
  public void onNewIntent(Intent intent){
    super.onNewIntent(intent);
    manejarIntentDeApertura(intent);
  }

  private void manejarIntentDeApertura(final Intent intent){
    if(intent == null || !Intent.ACTION_VIEW.equals(intent.getAction())) return;
    final Uri uri = intent.getData();
    if(uri == null) return;

    new Thread(new Runnable(){
      @Override
      public void run(){
        String texto = leerTexto(uri);
        if(texto == null) return;
        String nombre = obtenerNombre(uri);
        enviarAlWebView(texto, nombre);
      }
    }).start();
  }

  private String obtenerNombre(Uri uri){
    String nombre = "documento.md";
    if("content".equals(uri.getScheme())){
      Cursor c = getContentResolver().query(uri, null, null, null, null);
      if(c != null){
        try{
          int i = c.getColumnIndex(OpenableColumns.DISPLAY_NAME);
          if(i >= 0 && c.moveToFirst() && c.getString(i) != null) nombre = c.getString(i);
        } finally { c.close(); }
      }
    } else if(uri.getLastPathSegment() != null){
      nombre = uri.getLastPathSegment();
    }
    return nombre;
  }

  private String leerTexto(Uri uri){
    InputStream is = null;
    try{
      is = getContentResolver().openInputStream(uri);
      if(is == null) return null;
      BufferedReader br = new BufferedReader(new InputStreamReader(is, StandardCharsets.UTF_8));
      StringBuilder sb = new StringBuilder();
      char[] buf = new char[8192];
      int n;
      while((n = br.read(buf)) != -1) sb.append(buf, 0, n);
      return sb.toString();
    } catch(Exception e){
      return null;
    } finally {
      if(is != null){ try{ is.close(); }catch(Exception e){} }
    }
  }

  private void enviarAlWebView(final String texto, final String nombre){
    final String js = "window.plantilla.fijar(" + JSONObject.quote(texto) + "," + JSONObject.quote(nombre) +
      ",{origen:\"local\",version:1,descargado:" + System.currentTimeMillis() +
      ",aviso:" + JSONObject.quote("Abierto: " + nombre) + "});";
    esperarPuenteListoYEjecutar(js, 0);
  }

  private void esperarPuenteListoYEjecutar(final String js, final int intentos){
    new Handler(Looper.getMainLooper()).post(new Runnable(){
      @Override
      public void run(){
        if(getBridge() == null || getBridge().getWebView() == null){
          if(intentos < INTENTOS_MAXIMOS) reintentar(js, intentos);
          return;
        }
        getBridge().getWebView().evaluateJavascript(
          "typeof window.plantilla !== 'undefined'",
          new ValueCallback<String>(){
            @Override
            public void onReceiveValue(String listo){
              if("true".equals(listo)) getBridge().getWebView().evaluateJavascript(js, null);
              else if(intentos < INTENTOS_MAXIMOS) reintentar(js, intentos);
            }
          }
        );
      }
    });
  }

  private void reintentar(final String js, final int intentos){
    new Handler(Looper.getMainLooper()).postDelayed(new Runnable(){
      @Override public void run(){ esperarPuenteListoYEjecutar(js, intentos + 1); }
    }, 250);
  }
}
