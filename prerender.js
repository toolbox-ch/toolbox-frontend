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
    <div id="root">
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
                    <h2 class="text-2xl font-semibold mb-4">Tool wird geladen...</h2>
                    <p class="text-muted-foreground">
                      Das Tool wird automatisch geladen. Bitte warten Sie einen Moment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;
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
    
    // Get all pages
    const pages = getAllPages("./src/pages");
    console.log(`📄 Found ${pages.length} pages to prerender`);
    
    let prerenderedCount = 0;
    
    for (const pagePath of pages) {
      try {
        const route = getRouteFromFile(pagePath);
        const seoData = seoConfig[route] || defaultSEO;
        
        // Generate HTML for this page
        const html = generatePageHTML(route, seoData);
        
        // Determine output path
        let outputPath;
        if (route === '/') {
          outputPath = './dist/index.html';
        } else {
          const cleanRoute = route.replace(/^\//, '').replace(/\/$/, '');
          const pathParts = cleanRoute.split('/');
          const fileName = pathParts.pop() || 'index';
          const dirPath = pathParts.join('/');
          
          if (dirPath) {
            const fullDirPath = `./dist/${dirPath}`;
            if (!existsSync(fullDirPath)) {
              mkdirSync(fullDirPath, { recursive: true });
            }
            outputPath = `${fullDirPath}/${fileName}.html`;
          } else {
            outputPath = `./dist/${fileName}.html`;
          }
        }
        
        // Write the HTML file
        writeFileSync(outputPath, html);
        prerenderedCount++;
        
        console.log(`✅ Prerendered: ${route} → ${outputPath}`);
        
      } catch (error) {
        console.error(`❌ Failed to prerender ${pagePath}:`, error.message);
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
