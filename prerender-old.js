import { readFileSync, writeFileSync, existsSync } from "fs";
import { readFileSync as readFile } from "fs";

async function prerender() {
  console.log("🚀 Starting prerendering...");

  try {
    // Check if dist/index.html exists, if not create it from the template
    let template;
    if (existsSync("./dist/index.html")) {
      template = readFileSync("./dist/index.html", "utf-8");
    } else {
      // Read from the source index.html as fallback
      template = readFileSync("./index.html", "utf-8");
    }
    
    // Create prerendered HTML for the home route with full content
    const homeHtml = `
      <div class="min-h-screen flex flex-col">
        <div class="bg-card border-b sticky top-0 z-50 backdrop-blur-sm bg-card/95">
          <div class="container mx-auto px-4 py-4">
            <div class="flex items-center justify-between gap-4">
              <div class="text-xl font-bold text-primary cursor-pointer hover:text-primary-hover transition-colors">
                Toolbox24
              </div>
            </div>
          </div>
        </div>
        <main class="flex-1">
          <div class="min-h-screen">
            <!-- Hero Section -->
            <section class="py-16 md:py-24">
              <div class="container mx-auto px-4 text-center">
                <div class="max-w-3xl mx-auto">
                  <h1 class="text-4xl md:text-5xl font-bold text-foreground mb-6">
                    Toolbox24
                  </h1>
                  <p class="text-xl md:text-2xl text-muted-foreground mb-8">
                    Kostenlose Online-Tools für PDFs, Bilder und Vorlagen
                  </p>
                  <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 py-6 text-lg">
                    Alle Tools entdecken
                  </button>
                </div>
              </div>
            </section>

            <!-- Popular Tools Section -->
            <section class="py-16 bg-muted/30">
              <div class="container mx-auto px-4">
                <div class="text-center mb-12">
                  <h2 class="text-2xl md:text-3xl font-bold mb-4">Beliebte Tools</h2>
                  <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Unsere meistgenutzten Online-Tools für den täglichen Bedarf
                  </p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  <div class="text-center border-0 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col hover:border-primary/20 bg-card rounded-lg border p-6">
                    <div class="pb-3 flex-1">
                      <div class="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <svg class="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                        </svg>
                      </div>
                      <h3 class="text-xl font-semibold mb-3">PDF zusammenfügen</h3>
                      <p class="text-muted-foreground leading-relaxed">
                        Mehrere PDFs zu einem Dokument vereinen
                      </p>
                    </div>
                    <div class="pt-0">
                      <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 w-full hover:bg-blue-500 hover:text-white hover:border-blue-500">
                        Jetzt nutzen
                      </button>
                    </div>
                  </div>
                  
                  <div class="text-center border-0 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col hover:border-primary/20 bg-card rounded-lg border p-6">
                    <div class="pb-3 flex-1">
                      <div class="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <svg class="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                      </div>
                      <h3 class="text-xl font-semibold mb-3">Hintergrund entfernen</h3>
                      <p class="text-muted-foreground leading-relaxed">
                        KI-basierte Hintergrundentfernung für Bilder
                      </p>
                    </div>
                    <div class="pt-0">
                      <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 w-full hover:bg-blue-500 hover:text-white hover:border-blue-500">
                        Jetzt nutzen
                      </button>
                    </div>
                  </div>
                  
                  <div class="text-center border-0 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col hover:border-primary/20 bg-card rounded-lg border p-6">
                    <div class="pb-3 flex-1">
                      <div class="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <svg class="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                      </div>
                      <h3 class="text-xl font-semibold mb-3">Kündigungsvorlage</h3>
                      <p class="text-muted-foreground leading-relaxed">
                        Rechtssichere Vorlagen für alle Kündigungen
                      </p>
                    </div>
                    <div class="pt-0">
                      <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 w-full hover:bg-blue-500 hover:text-white hover:border-blue-500">
                        Jetzt nutzen
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- Categories Overview -->
            <section class="py-16">
              <div class="container mx-auto px-4">
                <div class="text-center mb-12">
                  <h2 class="text-2xl md:text-3xl font-bold mb-4">Alle Services</h2>
                  <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Entdecken Sie unsere drei Hauptkategorien digitaler Tools
                  </p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  <div class="text-center p-6 bg-card border rounded-lg hover:shadow-sm hover:border-primary/20 transition-all h-full flex flex-col">
                    <div class="text-4xl mb-4">📄</div>
                    <h3 class="text-xl font-semibold mb-3">Vorlagen</h3>
                    <p class="text-muted-foreground leading-relaxed mb-6 flex-1">
                      Rechtssichere Muster für Kündigungen, Bewerbungen und Verträge
                    </p>
                    <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 hover:bg-blue-500 hover:text-white hover:border-blue-500">
                      Alle Vorlagen anzeigen
                    </button>
                  </div>
                  
                  <div class="text-center p-6 bg-card border rounded-lg hover:shadow-sm hover:border-primary/20 transition-all h-full flex flex-col">
                    <div class="text-4xl mb-4">📋</div>
                    <h3 class="text-xl font-semibold mb-3">PDF Tools</h3>
                    <p class="text-muted-foreground leading-relaxed mb-6 flex-1">
                      PDF bearbeiten: Zusammenfügen, Teilen, Komprimieren
                    </p>
                    <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 hover:bg-blue-500 hover:text-white hover:border-blue-500">
                      Alle PDF Tools anzeigen
                    </button>
                  </div>
                  
                  <div class="text-center p-6 bg-card border rounded-lg hover:shadow-sm hover:border-primary/20 transition-all h-full flex flex-col">
                    <div class="text-4xl mb-4">🖼️</div>
                    <h3 class="text-xl font-semibold mb-3">Datei Tools</h3>
                    <p class="text-muted-foreground leading-relaxed mb-6 flex-1">
                      Bilder bearbeiten: Komprimieren, Konvertieren, Zuschneiden
                    </p>
                    <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 hover:bg-blue-500 hover:text-white hover:border-blue-500">
                      Alle Datei Tools anzeigen
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <!-- About Toolbox24 -->
            <section class="py-20 bg-gradient-to-br from-muted/20 via-background to-primary/5 relative overflow-hidden">
              <div class="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.1)_50%,transparent_75%)] bg-[length:20px_20px] opacity-30"></div>
              
              <div class="container mx-auto px-4 relative">
                <div class="max-w-5xl mx-auto">
                  <div class="text-center mb-16">
                    <h2 class="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                      Warum Toolbox24?
                    </h2>
                    <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
                      Die umfassende Lösung für alle Ihre digitalen Bedürfnisse
                    </p>
                  </div>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    <div class="group">
                      <div class="bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl p-6 h-full hover:shadow-lg transition-all duration-300 hover:border-primary/30">
                        <div class="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                          <svg class="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                        <h3 class="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">Alles an einem Ort</h3>
                        <p class="text-muted-foreground leading-relaxed">
                          Von PDF-Bearbeitung über Bildkonvertierung bis hin zu rechtssicheren Vorlagen - 
                          Toolbox24 vereint alle wichtigen Online-Tools an einem Ort.
                        </p>
                      </div>
                    </div>
                    
                    <div class="group">
                      <div class="bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl p-6 h-full hover:shadow-lg transition-all duration-300 hover:border-primary/30">
                        <div class="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                          <svg class="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                          </svg>
                        </div>
                        <h3 class="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">Sicher und privat</h3>
                        <p class="text-muted-foreground leading-relaxed">
                          Alle Verarbeitungen erfolgen lokal in Ihrem Browser. Ihre Dateien werden 
                          niemals hochgeladen oder gespeichert - maximaler Datenschutz garantiert.
                        </p>
                      </div>
                    </div>

                    <div class="group">
                      <div class="bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl p-6 h-full hover:shadow-lg transition-all duration-300 hover:border-primary/30">
                        <div class="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                          <svg class="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                        <h3 class="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">Schnell & unkompliziert</h3>
                        <p class="text-muted-foreground leading-relaxed">
                          Intuitive Bedienung und blitzschnelle Ergebnisse. Keine langen Wartezeiten, 
                          keine komplizierte Installation - einfach loslegen.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- Advantages -->
            <section class="py-16 bg-white">
              <div class="container mx-auto px-4">
                <div class="text-center mb-16">
                  <h2 class="text-2xl md:text-3xl font-bold mb-4 text-black">
                    Ihre Vorteile
                  </h2>
                  <p class="text-muted-foreground max-w-2xl mx-auto">
                    Entdecken Sie, warum Millionen von Nutzern Toolbox24 für ihre digitalen Aufgaben vertrauen
                  </p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                  <div class="text-center group">
                    <div class="bg-white/70 backdrop-blur-sm border border-primary/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-300 shadow-lg">
                      <svg class="h-7 w-7 text-primary group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <h3 class="font-semibold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">Kostenlos nutzbar</h3>
                    <p class="text-sm text-muted-foreground leading-relaxed">
                      Alle Tools ohne Gebühren
                    </p>
                  </div>
                  
                  <div class="text-center group">
                    <div class="bg-white/70 backdrop-blur-sm border border-primary/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-300 shadow-lg">
                      <svg class="h-7 w-7 text-primary group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                      </svg>
                    </div>
                    <h3 class="font-semibold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">Datenschutz garantiert</h3>
                    <p class="text-sm text-muted-foreground leading-relaxed">
                      Lokale Verarbeitung im Browser
                    </p>
                  </div>
                  
                  <div class="text-center group">
                    <div class="bg-white/70 backdrop-blur-sm border border-primary/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-300 shadow-lg">
                      <svg class="h-7 w-7 text-primary group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                    </div>
                    <h3 class="font-semibold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">Sofort einsatzbereit</h3>
                    <p class="text-sm text-muted-foreground leading-relaxed">
                      Keine Installation erforderlich
                    </p>
                  </div>
                  
                  <div class="text-center group">
                    <div class="bg-white/70 backdrop-blur-sm border border-primary/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-300 shadow-lg">
                      <svg class="h-7 w-7 text-primary group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <h3 class="font-semibold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">Mobilfreundlich</h3>
                    <p class="text-sm text-muted-foreground leading-relaxed">
                      Funktioniert auf allen Geräten
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    `;
    
    // Replace the placeholder with the prerendered HTML
    const html = template.replace("<!--app-html-->", homeHtml);
    
    // Ensure dist directory exists
    if (!existsSync("./dist")) {
      const { mkdirSync } = await import("fs");
      mkdirSync("./dist", { recursive: true });
    }
    
    // Write the updated index.html
    writeFileSync("./dist/index.html", html);
    
    console.log("✅ Prerendering completed successfully!");
    console.log("📄 Home page prerendered and saved to dist/index.html");
    console.log("📁 File size:", (html.length / 1024).toFixed(2), "KB");
    console.log("🔍 pre-rendered: dist/index.html");
  } catch (error) {
    console.error("❌ Prerendering failed:", error.message);
    console.error("Stack trace:", error.stack);
    
    // Create a fallback index.html if prerendering fails
    const fallbackHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Toolbox24 - Kostenlose Tools für PDF, Bilder & Vorlagen</title>
    <meta name="description" content="Kostenlose Online-Tools für PDF-Bearbeitung, Bildkonvertierung und professionelle Vorlagen. Direkt im Browser, ohne Upload - sicher und effizient." />
  </head>
  <body>
    <div id="root"><!--app-html--></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;
    
    writeFileSync("./dist/index.html", fallbackHtml);
    console.log("📄 Fallback index.html created");
  }
}

prerender();
