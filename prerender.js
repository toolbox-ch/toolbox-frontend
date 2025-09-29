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

async function generatePageHTML(route, seoData) {
  const { title, description } = seoData;
  
  try {
    // Import the built server bundle
    const { render } = await import("./dist/server/entry-server.js");
    
    // Render the React app with StaticRouter for the specific route
    const { appHtml, headTags } = render(route);
    
    // Read the template
    let template;
    if (existsSync("./dist/index.html")) {
      template = readFileSync("./dist/index.html", "utf-8");
    } else {
      template = readFileSync("./index.html", "utf-8");
    }
    
    // Replace placeholders with real content
    const html = template
      .replace("<!--app-html-->", appHtml)
      .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
      .replace(/<meta name="description" content=".*?"\/>/, `<meta name="description" content="${description}" />`)
      .replace("</head>", `${headTags}\n</head>`);
    
    return html;
    
  } catch (error) {
    console.error(`Error rendering route ${route}:`, error.message);
    
    // Fallback HTML if rendering fails
    return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <script type="module" crossorigin src="/assets/index-BW-Rf4kG.js"></script>
    <link rel="stylesheet" crossorigin href="/assets/index-SlGThx_s.css">
  </head>
  <body>
    <div id="root"><!--app-html--></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;
  }
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
        
        // Generate HTML for this page using real SSR
        const html = await generatePageHTML(route, seoData);
        
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
