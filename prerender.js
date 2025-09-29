import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync } from "fs";
import { join, dirname, basename, extname } from "path";

// Import SEO config
import { seoConfig, defaultSEO } from "./src/seo.config.ts";

// Route mapping for pages
const routeMap = {
  'Home.tsx': '/',
  'Index.tsx': '/',
  'AlleTools.tsx': '/alle-tools',
  'AllTemplates.tsx': '/alle-vorlagen',
  'Blog.tsx': '/blog',
  'BlogPost.tsx': '/blog/:slug',
  'CategoryPage.tsx': '/kategorie/:slug',
  'TemplateDetail.tsx': '/vorlage/:slug',
  'SearchResults.tsx': '/suche',
  'Kontakt.tsx': '/kontakt',
  'Impressum.tsx': '/impressum',
  'Rechtliches.tsx': '/rechtliches',
  'NotFound.tsx': '/404',
  'GifToMp4.tsx': '/gif-zu-mp4',
  
  // PDF Tools
  'AllPDFTools.tsx': '/pdf-tools/alle',
  'PDFMerge.tsx': '/pdf-tools/pdf-zusammenfuegen',
  'PDFCompress.tsx': '/pdf-tools/pdf-komprimieren',
  'PDFSplit.tsx': '/pdf-tools/pdf-teilen',
  'PDFToWord.tsx': '/pdf-tools/pdf-zu-word',
  'WordToPDF.tsx': '/pdf-tools/word-zu-pdf',
  'PDFToImages.tsx': '/pdf-tools/pdf-zu-bilder',
  'ImagesToPDF.tsx': '/pdf-tools/bilder-zu-pdf',
  'PDFDeletePages.tsx': '/pdf-tools/seiten-loeschen',
  
  // File Tools
  'AllFileTools.tsx': '/datei-tools/alle',
  'ImageCompress.tsx': '/datei-tools/bild-komprimieren',
  'ImageResize.tsx': '/datei-tools/bild-groesse-aendern',
  'ImageCrop.tsx': '/datei-tools/bild-zuschneiden',
  'ImageRotate.tsx': '/datei-tools/bild-drehen',
  'RemoveBackground.tsx': '/datei-tools/hintergrund-entfernen',
  'ImageConverter.tsx': '/datei-tools/bild-konvertieren',
  'WebPConverter.tsx': '/datei-tools/webp-konverter',
  'HEICToJPG.tsx': '/datei-tools/heic-zu-jpg',
  'GifToMp4.tsx': '/datei-tools/gif-zu-mp4',
  'ImageConverterHub.tsx': '/datei-tools/konverter',
  
  // Bild Tools
  'PngToJpg.tsx': '/bild/png-zu-jpg',
  'JpgToPng.tsx': '/bild/jpg-zu-png',
  'WebpToJpg.tsx': '/bild/webp-zu-jpg',
  'WebpToPng.tsx': '/bild/webp-zu-png',
  'HeicToJpg.tsx': '/bild/heic-zu-jpg',
  'AvifToJpg.tsx': '/bild/avif-zu-jpg',
  'JpegCompress.tsx': '/bild/jpeg-komprimieren',
  'PngCompress.tsx': '/bild/png-komprimieren',
  'SvgCompress.tsx': '/bild/svg-komprimieren',
  'GifCompress.tsx': '/bild/gif-komprimieren'
};

function getRouteFromFile(filePath) {
  const fileName = basename(filePath, '.tsx');
  const relativePath = filePath.replace('src/pages/', '').replace('.tsx', '');
  
  // Handle subdirectories with proper route mapping
  if (relativePath.includes('/')) {
    const parts = relativePath.split('/');
    const subdir = parts[0];
    const file = parts[1];
    
    if (subdir === 'pdf-tools') {
      // Map PDF tools to correct routes
      const pdfRouteMap = {
        'AllPDFTools': '/pdf-tools/alle',
        'PDFMerge': '/pdf-tools/pdf-zusammenfuegen',
        'PDFCompress': '/pdf-tools/pdf-komprimieren',
        'PDFSplit': '/pdf-tools/pdf-teilen',
        'PDFToWord': '/pdf-tools/pdf-zu-word',
        'WordToPDF': '/pdf-tools/word-zu-pdf',
        'PDFToImages': '/pdf-tools/pdf-zu-bilder',
        'ImagesToPDF': '/pdf-tools/bilder-zu-pdf',
        'PDFDeletePages': '/pdf-tools/seiten-loeschen'
      };
      return pdfRouteMap[file] || `/pdf-tools/${file.toLowerCase()}`;
    } else if (subdir === 'file-tools') {
      // Map file tools to correct routes
      const fileRouteMap = {
        'AllFileTools': '/datei-tools/alle',
        'ImageCompress': '/datei-tools/bild-komprimieren',
        'ImageResize': '/datei-tools/bild-groesse-aendern',
        'ImageCrop': '/datei-tools/bild-zuschneiden',
        'ImageRotate': '/datei-tools/bild-drehen',
        'RemoveBackground': '/datei-tools/hintergrund-entfernen',
        'ImageConverter': '/datei-tools/bild-konvertieren',
        'WebPConverter': '/datei-tools/webp-konverter',
        'HEICToJPG': '/datei-tools/heic-zu-jpg',
        'GifToMp4': '/datei-tools/gif-zu-mp4',
        'ImageConverterHub': '/datei-tools/konverter'
      };
      return fileRouteMap[file] || `/datei-tools/${file.toLowerCase()}`;
    } else if (subdir === 'bild') {
      // Map bild tools to correct routes
      const bildRouteMap = {
        'PngToJpg': '/bild/png-zu-jpg',
        'JpgToPng': '/bild/jpg-zu-png',
        'WebpToJpg': '/bild/webp-zu-jpg',
        'WebpToPng': '/bild/webp-zu-png',
        'HeicToJpg': '/bild/heic-zu-jpg',
        'AvifToJpg': '/bild/avif-zu-jpg',
        'JpegCompress': '/bild/jpeg-komprimieren',
        'PngCompress': '/bild/png-komprimieren',
        'SvgCompress': '/bild/svg-komprimieren',
        'GifCompress': '/bild/gif-komprimieren'
      };
      return bildRouteMap[file] || `/bild/${file.toLowerCase()}`;
    }
  }
  
  return routeMap[fileName] || `/${fileName.toLowerCase()}`;
}

function generatePageHTML(route, seoData) {
  const { title, description, h1 } = seoData;
  
  // Generate comprehensive static content that matches the actual React components
  const pageContent = generateComprehensivePageContent(route, seoData);
  
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta name="author" content="Toolbox24" />
    <meta name="keywords" content="PDF Tools, Bildbearbeitung, Vorlagen, Kündigung, Bewerbung, kostenlos, Online-Tools" />

    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://www.toolbox24.ch${route}" />
    <meta property="og:image" content="https://www.toolbox24.ch/og-image.jpg" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@toolbox24ch" />
    <meta name="twitter:image" content="https://www.toolbox24.ch/og-image.jpg" />
    <script type="module" crossorigin src="/assets/index-BW-Rf4kG.js"></script>
    <link rel="stylesheet" crossorigin href="/assets/index-SlGThx_s.css">
  </head>

  <body>
    <div id="root">${pageContent}</div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;
}

function generateComprehensivePageContent(route, seoData) {
  const { h1, description } = seoData;
  
  if (route === '/') {
    return generateFullHomePageContent();
  } else if (route.startsWith('/pdf-tools/')) {
    return generateFullToolPageContent(route, h1, description, 'PDF');
  } else if (route.startsWith('/datei-tools/')) {
    return generateFullToolPageContent(route, h1, description, 'Datei');
  } else if (route.startsWith('/bild/')) {
    return generateFullToolPageContent(route, h1, description, 'Bild');
  } else if (route === '/alle-tools') {
    return generateFullAlleToolsContent();
  } else if (route === '/alle-vorlagen') {
    return generateFullAllTemplatesContent();
  } else {
    return generateFullGenericPageContent(h1, description);
  }
}

function generateFullHomePageContent() {
  return `
    <div class="min-h-screen flex flex-col">
      <div class="bg-card border-b sticky top-0 z-50 backdrop-blur-sm bg-card/95">
        <div class="container mx-auto px-4 py-4">
          <div class="flex items-center justify-between gap-4">
            <div class="text-xl font-bold text-primary cursor-pointer hover:text-primary-hover transition-colors">
              Toolbox24
            </div>
            <nav class="hidden md:flex items-center space-x-6">
              <a href="/alle-tools" class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Alle Tools</a>
              <a href="/alle-vorlagen" class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Vorlagen</a>
              <a href="/blog" class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Blog</a>
              <a href="/kontakt" class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Kontakt</a>
            </nav>
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
                <p class="text-lg text-muted-foreground mb-8">
                  Professionelle Tools für den täglichen Bedarf - direkt im Browser, ohne Anmeldung, vollständig kostenlos.
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
                      Mehrere PDFs zu einem Dokument vereinen. Schnell, sicher und kostenlos.
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
                      KI-basierte Hintergrundentfernung für Bilder. Automatisch und präzise.
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
                      Rechtssichere Vorlagen für alle Kündigungen. Professionell und aktuell.
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

          <!-- Categories Section -->
          <section class="py-16">
            <div class="container mx-auto px-4">
              <div class="text-center mb-12">
                <h2 class="text-2xl md:text-3xl font-bold mb-4">Kategorien</h2>
                <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Entdecken Sie unsere Tools nach Kategorien
                </p>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div class="text-center p-6 bg-card rounded-lg border">
                  <div class="bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg class="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                  </div>
                  <h3 class="text-xl font-semibold mb-2">PDF Tools</h3>
                  <p class="text-muted-foreground mb-4">PDFs bearbeiten, zusammenfügen, teilen und konvertieren</p>
                  <a href="/pdf-tools/alle" class="text-primary hover:text-primary/80 font-medium">Alle PDF Tools →</a>
                </div>
                
                <div class="text-center p-6 bg-card rounded-lg border">
                  <div class="bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg class="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <h3 class="text-xl font-semibold mb-2">Bild Tools</h3>
                  <p class="text-muted-foreground mb-4">Bilder komprimieren, konvertieren und bearbeiten</p>
                  <a href="/datei-tools/alle" class="text-primary hover:text-primary/80 font-medium">Alle Bild Tools →</a>
                </div>
                
                <div class="text-center p-6 bg-card rounded-lg border">
                  <div class="bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg class="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                  </div>
                  <h3 class="text-xl font-semibold mb-2">Vorlagen</h3>
                  <p class="text-muted-foreground mb-4">Professionelle Vorlagen für alle Lebenslagen</p>
                  <a href="/alle-vorlagen" class="text-primary hover:text-primary/80 font-medium">Alle Vorlagen →</a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <footer class="bg-muted/30 border-t">
        <div class="container mx-auto px-4 py-8">
          <div class="text-center">
            <div class="text-xl font-bold text-primary mb-4">Toolbox24</div>
            <p class="text-muted-foreground mb-4">Kostenlose Online-Tools für PDF, Bilder und Vorlagen</p>
            <div class="flex justify-center space-x-6">
              <a href="/impressum" class="text-sm text-muted-foreground hover:text-foreground">Impressum</a>
              <a href="/rechtliches" class="text-sm text-muted-foreground hover:text-foreground">Rechtliches</a>
              <a href="/kontakt" class="text-sm text-muted-foreground hover:text-foreground">Kontakt</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  `;
}

function generateFullToolPageContent(route, h1, description, toolType) {
  return `
    <div class="min-h-screen flex flex-col">
      <div class="bg-card border-b sticky top-0 z-50 backdrop-blur-sm bg-card/95">
        <div class="container mx-auto px-4 py-4">
          <div class="flex items-center justify-between gap-4">
            <div class="text-xl font-bold text-primary cursor-pointer hover:text-primary-hover transition-colors">
              Toolbox24
            </div>
            <nav class="hidden md:flex items-center space-x-6">
              <a href="/alle-tools" class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Alle Tools</a>
              <a href="/alle-vorlagen" class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Vorlagen</a>
              <a href="/blog" class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Blog</a>
              <a href="/kontakt" class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Kontakt</a>
            </nav>
          </div>
        </div>
      </div>
      <main class="flex-1">
        <div class="min-h-screen py-16">
          <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto text-center">
              <h1 class="text-4xl md:text-5xl font-bold text-foreground mb-6">
                ${h1}
              </h1>
              <p class="text-xl text-muted-foreground mb-8">
                ${description}
              </p>
              <div class="bg-card border rounded-lg p-8 mb-8">
                <div class="text-center">
                  <div class="bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg class="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  <h2 class="text-2xl font-semibold mb-4">${toolType} Tool wird geladen...</h2>
                  <p class="text-muted-foreground">
                    Das ${toolType.toLowerCase()}-Tool wird automatisch geladen. Bitte warten Sie einen Moment.
                  </p>
                </div>
              </div>
              
              <div class="text-left max-w-2xl mx-auto">
                <h3 class="text-xl font-semibold mb-4">Funktionen</h3>
                <ul class="space-y-2 text-muted-foreground">
                  <li>• Kostenlose Nutzung ohne Anmeldung</li>
                  <li>• Sichere Verarbeitung direkt im Browser</li>
                  <li>• Keine Datenübertragung an Server</li>
                  <li>• Unterstützt alle gängigen Formate</li>
                  <li>• Sofortige Ergebnisse</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer class="bg-muted/30 border-t">
        <div class="container mx-auto px-4 py-8">
          <div class="text-center">
            <div class="text-xl font-bold text-primary mb-4">Toolbox24</div>
            <p class="text-muted-foreground mb-4">Kostenlose Online-Tools für PDF, Bilder und Vorlagen</p>
            <div class="flex justify-center space-x-6">
              <a href="/impressum" class="text-sm text-muted-foreground hover:text-foreground">Impressum</a>
              <a href="/rechtliches" class="text-sm text-muted-foreground hover:text-foreground">Rechtliches</a>
              <a href="/kontakt" class="text-sm text-muted-foreground hover:text-foreground">Kontakt</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  `;
}

function generateFullAlleToolsContent() {
  return `
    <div class="min-h-screen flex flex-col">
      <div class="bg-card border-b sticky top-0 z-50 backdrop-blur-sm bg-card/95">
        <div class="container mx-auto px-4 py-4">
          <div class="flex items-center justify-between gap-4">
            <div class="text-xl font-bold text-primary cursor-pointer hover:text-primary-hover transition-colors">
              Toolbox24
            </div>
            <nav class="hidden md:flex items-center space-x-6">
              <a href="/alle-tools" class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Alle Tools</a>
              <a href="/alle-vorlagen" class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Vorlagen</a>
              <a href="/blog" class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Blog</a>
              <a href="/kontakt" class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Kontakt</a>
            </nav>
          </div>
        </div>
      </div>
      <main class="flex-1">
        <div class="min-h-screen py-16">
          <div class="container mx-auto px-4">
            <div class="max-w-6xl mx-auto">
              <h1 class="text-4xl md:text-5xl font-bold text-foreground mb-6 text-center">
                Alle Tools
              </h1>
              <p class="text-xl text-muted-foreground mb-12 text-center">
                Entdecken Sie alle kostenlosen Online-Tools von Toolbox24
              </p>
              
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="bg-card rounded-lg border p-6">
                  <h3 class="text-lg font-semibold mb-2">PDF Tools</h3>
                  <p class="text-muted-foreground mb-4">PDFs bearbeiten, zusammenfügen, teilen und konvertieren</p>
                  <a href="/pdf-tools/alle" class="text-primary hover:text-primary/80 font-medium">Alle PDF Tools →</a>
                </div>
                
                <div class="bg-card rounded-lg border p-6">
                  <h3 class="text-lg font-semibold mb-2">Bild Tools</h3>
                  <p class="text-muted-foreground mb-4">Bilder komprimieren, konvertieren und bearbeiten</p>
                  <a href="/datei-tools/alle" class="text-primary hover:text-primary/80 font-medium">Alle Bild Tools →</a>
                </div>
                
                <div class="bg-card rounded-lg border p-6">
                  <h3 class="text-lg font-semibold mb-2">Vorlagen</h3>
                  <p class="text-muted-foreground mb-4">Professionelle Vorlagen für alle Lebenslagen</p>
                  <a href="/alle-vorlagen" class="text-primary hover:text-primary/80 font-medium">Alle Vorlagen →</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer class="bg-muted/30 border-t">
        <div class="container mx-auto px-4 py-8">
          <div class="text-center">
            <div class="text-xl font-bold text-primary mb-4">Toolbox24</div>
            <p class="text-muted-foreground mb-4">Kostenlose Online-Tools für PDF, Bilder und Vorlagen</p>
            <div class="flex justify-center space-x-6">
              <a href="/impressum" class="text-sm text-muted-foreground hover:text-foreground">Impressum</a>
              <a href="/rechtliches" class="text-sm text-muted-foreground hover:text-foreground">Rechtliches</a>
              <a href="/kontakt" class="text-sm text-muted-foreground hover:text-foreground">Kontakt</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  `;
}

function generateFullAllTemplatesContent() {
  return `
    <div class="min-h-screen flex flex-col">
      <div class="bg-card border-b sticky top-0 z-50 backdrop-blur-sm bg-card/95">
        <div class="container mx-auto px-4 py-4">
          <div class="flex items-center justify-between gap-4">
            <div class="text-xl font-bold text-primary cursor-pointer hover:text-primary-hover transition-colors">
              Toolbox24
            </div>
            <nav class="hidden md:flex items-center space-x-6">
              <a href="/alle-tools" class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Alle Tools</a>
              <a href="/alle-vorlagen" class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Vorlagen</a>
              <a href="/blog" class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Blog</a>
              <a href="/kontakt" class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Kontakt</a>
            </nav>
          </div>
        </div>
      </div>
      <main class="flex-1">
        <div class="min-h-screen py-16">
          <div class="container mx-auto px-4">
            <div class="max-w-6xl mx-auto">
              <h1 class="text-4xl md:text-5xl font-bold text-foreground mb-6 text-center">
                Alle Vorlagen
              </h1>
              <p class="text-xl text-muted-foreground mb-12 text-center">
                Professionelle Vorlagen für alle Lebenslagen
              </p>
              
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="bg-card rounded-lg border p-6">
                  <h3 class="text-lg font-semibold mb-2">Kündigungsvorlagen</h3>
                  <p class="text-muted-foreground mb-4">Rechtssichere Vorlagen für alle Kündigungen</p>
                  <a href="/vorlage/kuendigung" class="text-primary hover:text-primary/80 font-medium">Vorlagen ansehen →</a>
                </div>
                
                <div class="bg-card rounded-lg border p-6">
                  <h3 class="text-lg font-semibold mb-2">Bewerbungsvorlagen</h3>
                  <p class="text-muted-foreground mb-4">Professionelle Bewerbungsunterlagen</p>
                  <a href="/vorlage/bewerbung" class="text-primary hover:text-primary/80 font-medium">Vorlagen ansehen →</a>
                </div>
                
                <div class="bg-card rounded-lg border p-6">
                  <h3 class="text-lg font-semibold mb-2">Vertragsvorlagen</h3>
                  <p class="text-muted-foreground mb-4">Rechtssichere Verträge und Vereinbarungen</p>
                  <a href="/vorlage/vertrag" class="text-primary hover:text-primary/80 font-medium">Vorlagen ansehen →</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer class="bg-muted/30 border-t">
        <div class="container mx-auto px-4 py-8">
          <div class="text-center">
            <div class="text-xl font-bold text-primary mb-4">Toolbox24</div>
            <p class="text-muted-foreground mb-4">Kostenlose Online-Tools für PDF, Bilder und Vorlagen</p>
            <div class="flex justify-center space-x-6">
              <a href="/impressum" class="text-sm text-muted-foreground hover:text-foreground">Impressum</a>
              <a href="/rechtliches" class="text-sm text-muted-foreground hover:text-foreground">Rechtliches</a>
              <a href="/kontakt" class="text-sm text-muted-foreground hover:text-foreground">Kontakt</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  `;
}

function generateFullGenericPageContent(h1, description) {
  return `
    <div class="min-h-screen flex flex-col">
      <div class="bg-card border-b sticky top-0 z-50 backdrop-blur-sm bg-card/95">
        <div class="container mx-auto px-4 py-4">
          <div class="flex items-center justify-between gap-4">
            <div class="text-xl font-bold text-primary cursor-pointer hover:text-primary-hover transition-colors">
              Toolbox24
            </div>
            <nav class="hidden md:flex items-center space-x-6">
              <a href="/alle-tools" class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Alle Tools</a>
              <a href="/alle-vorlagen" class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Vorlagen</a>
              <a href="/blog" class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Blog</a>
              <a href="/kontakt" class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Kontakt</a>
            </nav>
          </div>
        </div>
      </div>
      <main class="flex-1">
        <div class="min-h-screen py-16">
          <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto text-center">
              <h1 class="text-4xl md:text-5xl font-bold text-foreground mb-6">
                ${h1}
              </h1>
              <p class="text-xl text-muted-foreground mb-8">
                ${description}
              </p>
              <div class="bg-card border rounded-lg p-8">
                <div class="text-center">
                  <div class="bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg class="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  <h2 class="text-2xl font-semibold mb-4">Inhalt wird geladen...</h2>
                  <p class="text-muted-foreground">
                    Die Seite wird automatisch geladen. Bitte warten Sie einen Moment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer class="bg-muted/30 border-t">
        <div class="container mx-auto px-4 py-8">
          <div class="text-center">
            <div class="text-xl font-bold text-primary mb-4">Toolbox24</div>
            <p class="text-muted-foreground mb-4">Kostenlose Online-Tools für PDF, Bilder und Vorlagen</p>
            <div class="flex justify-center space-x-6">
              <a href="/impressum" class="text-sm text-muted-foreground hover:text-foreground">Impressum</a>
              <a href="/rechtliches" class="text-sm text-muted-foreground hover:text-foreground">Rechtliches</a>
              <a href="/kontakt" class="text-sm text-muted-foreground hover:text-foreground">Kontakt</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  `;
}



function getAllPages(dir) {
  const pages = [];
  
  function scanDirectory(currentDir) {
    const items = readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = join(currentDir, item);
      const stat = statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (item.endsWith('.tsx') && !item.includes('.test.') && !item.includes('.spec.')) {
        pages.push(fullPath);
      }
    }
  }
  
  scanDirectory(dir);
  return pages;
}

async function prerender() {
  console.log("🚀 Starting full SSG prerendering...");

  try {
    // Ensure dist directory exists
    if (!existsSync("./dist")) {
      mkdirSync("./dist", { recursive: true });
    }
    
    // Build routes from seo.config.ts exactly
    const routes = Object.keys(seoConfig);
    console.log(`📄 Found ${routes.length} routes to prerender from seo.config.ts`);
    
    let prerenderedCount = 0;
    
    for (const route of routes) {
      try {
        const seoData = seoConfig[route];
        
        // Generate HTML for this page using comprehensive static content
        const html = generatePageHTML(route, seoData);
        
        // Determine output path - use folder structure with index.html
        const filePath = route === '/' ? 'dist/index.html' : `dist${route}/index.html`;
        
        // Create directory if needed
        const dirPath = dirname(filePath);
        if (!existsSync(dirPath)) {
          mkdirSync(dirPath, { recursive: true });
        }
        
        // Write the HTML file
        writeFileSync(filePath, html);
        prerenderedCount++;
        
        console.log(`✅ Prerendered: ${route} → ${filePath}`);
        
      } catch (error) {
        console.error(`❌ Failed to prerender ${route}:`, error.message);
      }
    }
    
    console.log(`\n🎉 Prerendering completed successfully!`);
    console.log(`📊 Prerendered ${prerenderedCount} pages`);
    console.log(`🔍 pre-rendered: dist/index.html and ${prerenderedCount - 1} other pages`);
    
  } catch (error) {
    console.error("❌ Prerendering failed:", error.message);
    console.error("Stack trace:", error.stack);
  }
}

prerender();
