export interface SEOData {
  title: string;
  description: string;
  h1: string;
}

export const seoConfig: Record<string, SEOData> = {
  // Main pages
  '/': {
    title: 'Toolbox24 - Kostenlose Tools für PDF, Bilder & Vorlagen',
    description: 'Kostenlose Online-Tools für PDF-Bearbeitung, Bildkonvertierung und professionelle Vorlagen. Direkt im Browser, ohne Upload - sicher und effizient.',
    h1: 'Toolbox24'
  },
  '/alle-tools': {
    title: 'Alle Tools - Toolbox24',
    description: 'Entdecken Sie alle kostenlosen Online-Tools von Toolbox24: PDF-Bearbeitung, Bildkonvertierung, Vorlagen und mehr.',
    h1: 'Alle Tools'
  },
  '/alle-vorlagen': {
    title: 'Alle Vorlagen - Toolbox24',
    description: 'Rechtssichere Vorlagen für Kündigungen, Bewerbungen, Verträge und mehr. Kostenlos und sofort verwendbar.',
    h1: 'Alle Vorlagen'
  },
  '/blog': {
    title: 'Blog - Toolbox24',
    description: 'Aktuelle Artikel und Tipps rund um digitale Tools, PDF-Bearbeitung und Vorlagen.',
    h1: 'Blog'
  },
  '/kontakt': {
    title: 'Kontakt - Toolbox24',
    description: 'Kontaktieren Sie uns für Fragen, Feedback oder Support zu unseren kostenlosen Online-Tools.',
    h1: 'Kontakt'
  },
  '/impressum': {
    title: 'Impressum - Toolbox24',
    description: 'Impressum und rechtliche Informationen zu Toolbox24.',
    h1: 'Impressum'
  },
  '/rechtliches': {
    title: 'Rechtliches - Toolbox24',
    description: 'Rechtliche Hinweise und Datenschutzbestimmungen von Toolbox24.',
    h1: 'Rechtliches'
  },

  // PDF Tools
  '/pdf-tools/alle': {
    title: 'PDF Tools - Toolbox24',
    description: 'Alle PDF-Tools: Zusammenfügen, Teilen, Komprimieren, Konvertieren und mehr. Kostenlos und sicher.',
    h1: 'PDF Tools'
  },
  '/pdf-tools/pdf-zusammenfuegen': {
    title: 'PDF zusammenfügen - Kostenloses Online Tool',
    description: 'Mehrere PDF-Dateien kostenlos und sicher zu einem Dokument zusammenfügen. Keine Anmeldung erforderlich.',
    h1: 'PDF zusammenfügen'
  },
  '/pdf-tools/pdf-komprimieren': {
    title: 'PDF komprimieren - Kostenloses Online Tool',
    description: 'PDF-Dateien kostenlos komprimieren und verkleinern. Reduzieren Sie die Dateigröße ohne Qualitätsverlust.',
    h1: 'PDF komprimieren'
  },
  '/pdf-tools/pdf-teilen': {
    title: 'PDF teilen - Kostenloses Online Tool',
    description: 'PDF-Dateien kostenlos in einzelne Seiten aufteilen. Extrahieren Sie spezifische Seiten aus Ihren PDFs.',
    h1: 'PDF teilen'
  },
  '/pdf-tools/pdf-zu-word': {
    title: 'PDF zu Word konvertieren - Kostenloses Online Tool',
    description: 'PDF-Dateien kostenlos in bearbeitbare Word-Dokumente umwandeln. Keine Software-Installation nötig.',
    h1: 'PDF zu Word konvertieren'
  },
  '/pdf-tools/word-zu-pdf': {
    title: 'Word zu PDF konvertieren - Kostenloses Online Tool',
    description: 'Word-Dokumente kostenlos in PDF-Format umwandeln. Schnell und sicher online.',
    h1: 'Word zu PDF konvertieren'
  },
  '/pdf-tools/pdf-zu-bilder': {
    title: 'PDF zu Bilder konvertieren - Kostenloses Online Tool',
    description: 'PDF-Seiten kostenlos in JPG oder PNG Bilder umwandeln. Hohe Qualität garantiert.',
    h1: 'PDF zu Bilder konvertieren'
  },
  '/pdf-tools/bilder-zu-pdf': {
    title: 'Bilder zu PDF konvertieren - Kostenloses Online Tool',
    description: 'JPG, PNG und andere Bilder kostenlos in PDF-Dokumente umwandeln.',
    h1: 'Bilder zu PDF konvertieren'
  },
  '/pdf-tools/seiten-loeschen': {
    title: 'PDF Seiten löschen - Kostenloses Online Tool',
    description: 'Unerwünschte Seiten aus PDF-Dokumenten kostenlos entfernen. Schnell und sicher.',
    h1: 'PDF Seiten löschen'
  },

  // File Tools
  '/datei-tools/alle': {
    title: 'Datei Tools - Toolbox24',
    description: 'Alle Datei-Tools: Bildbearbeitung, Konvertierung, Komprimierung und mehr. Kostenlos und sicher.',
    h1: 'Datei Tools'
  },
  '/datei-tools/bild-komprimieren': {
    title: 'Bild komprimieren - Kostenloses Online Tool',
    description: 'Bilder kostenlos komprimieren und verkleinern. Reduzieren Sie die Dateigröße ohne sichtbaren Qualitätsverlust.',
    h1: 'Bild komprimieren'
  },
  '/datei-tools/bild-groesse-aendern': {
    title: 'Bildgröße ändern - Kostenloses Online Tool',
    description: 'Bildabmessungen kostenlos ändern. Resize-Tool für JPG, PNG und andere Bildformate.',
    h1: 'Bildgröße ändern'
  },
  '/datei-tools/bild-zuschneiden': {
    title: 'Bild zuschneiden - Kostenloses Online Tool',
    description: 'Bilder kostenlos zuschneiden und bearbeiten. Präzise Auswahl und Cropping-Tool.',
    h1: 'Bild zuschneiden'
  },
  '/datei-tools/bild-drehen': {
    title: 'Bild drehen - Kostenloses Online Tool',
    description: 'Bilder kostenlos drehen und spiegeln. 90°, 180°, 270° Rotation und Flip-Funktionen.',
    h1: 'Bild drehen'
  },
  '/datei-tools/hintergrund-entfernen': {
    title: 'Hintergrund entfernen - Kostenloses Online Tool',
    description: 'Hintergrund kostenlos mit KI entfernen. Professionelle Freistellung für Personen und Objekte.',
    h1: 'Hintergrund entfernen'
  },
  '/datei-tools/bild-konvertieren': {
    title: 'Bild konvertieren - Kostenloses Online Tool',
    description: 'Bilder zwischen verschiedenen Formaten konvertieren. JPG, PNG, WEBP und mehr.',
    h1: 'Bild konvertieren'
  },
  '/datei-tools/webp-konverter': {
    title: 'WEBP Konverter - Kostenloses Online Tool',
    description: 'WEBP Bilder kostenlos in andere Formate konvertieren. Schnell und verlustfrei.',
    h1: 'WEBP Konverter'
  },
  '/datei-tools/heic-zu-jpg': {
    title: 'HEIC zu JPG konvertieren - Kostenloses Online Tool',
    description: 'iPhone HEIC Bilder kostenlos in JPG umwandeln. Kompatibel mit allen Geräten.',
    h1: 'HEIC zu JPG konvertieren'
  },
  '/datei-tools/gif-zu-mp4': {
    title: 'GIF zu MP4 konvertieren - Kostenloses Online Tool',
    description: 'Animierte GIFs kostenlos in MP4 Videos umwandeln. Bessere Komprimierung und Qualität.',
    h1: 'GIF zu MP4 konvertieren'
  },
  '/datei-tools/konverter': {
    title: 'Bild Konverter Hub - Toolbox24',
    description: 'Zentraler Hub für alle Bildkonvertierungen. JPG, PNG, WEBP, HEIC und mehr.',
    h1: 'Bild Konverter Hub'
  },

  // Bild Tools
  '/bild/png-zu-jpg': {
    title: 'PNG zu JPG konvertieren - Kostenloses Online Tool',
    description: 'PNG Bilder kostenlos in JPG Format umwandeln. Optimiert für Web und Speicher.',
    h1: 'PNG zu JPG konvertieren'
  },
  '/bild/jpg-zu-png': {
    title: 'JPG zu PNG konvertieren - Kostenloses Online Tool',
    description: 'JPG Bilder kostenlos in verlustfreies PNG Format umwandeln.',
    h1: 'JPG zu PNG konvertieren'
  },
  '/bild/webp-zu-jpg': {
    title: 'WEBP zu JPG konvertieren - Kostenloses Online Tool',
    description: 'WEBP Bilder kostenlos in JPG Format umwandeln. Universelle Kompatibilität.',
    h1: 'WEBP zu JPG konvertieren'
  },
  '/bild/webp-zu-png': {
    title: 'WEBP zu PNG konvertieren - Kostenloses Online Tool',
    description: 'WEBP Bilder kostenlos in PNG Format umwandeln. Verlustfreie Konvertierung.',
    h1: 'WEBP zu PNG konvertieren'
  },
  '/bild/heic-zu-jpg': {
    title: 'HEIC zu JPG konvertieren - Kostenloses Online Tool',
    description: 'iPhone HEIC Bilder kostenlos in JPG umwandeln. Für alle Geräte kompatibel.',
    h1: 'HEIC zu JPG konvertieren'
  },
  '/bild/avif-zu-jpg': {
    title: 'AVIF zu JPG konvertieren - Kostenloses Online Tool',
    description: 'AVIF Bilder kostenlos in JPG Format umwandeln. Moderne Bildformate unterstützt.',
    h1: 'AVIF zu JPG konvertieren'
  },
  '/bild/jpeg-komprimieren': {
    title: 'JPEG komprimieren - Kostenloses Online Tool',
    description: 'JPEG Bilder kostenlos komprimieren. Reduzieren Sie die Dateigröße ohne Qualitätsverlust.',
    h1: 'JPEG komprimieren'
  },
  '/bild/png-komprimieren': {
    title: 'PNG komprimieren - Kostenloses Online Tool',
    description: 'PNG Bilder kostenlos komprimieren. Optimieren Sie PNG-Dateien für das Web.',
    h1: 'PNG komprimieren'
  },
  '/bild/svg-komprimieren': {
    title: 'SVG komprimieren - Kostenloses Online Tool',
    description: 'SVG Vektorgrafiken kostenlos komprimieren. Reduzieren Sie die Dateigröße.',
    h1: 'SVG komprimieren'
  },
  '/bild/gif-komprimieren': {
    title: 'GIF komprimieren - Kostenloses Online Tool',
    description: 'GIF Animationen kostenlos komprimieren. Optimieren Sie GIF-Dateien für das Web.',
    h1: 'GIF komprimieren'
  },
  '/gif-zu-mp4': {
    title: 'GIF zu MP4 konvertieren - Kostenloses Online Tool',
    description: 'Animierte GIFs kostenlos in MP4 Videos umwandeln. Bessere Komprimierung und Qualität.',
    h1: 'GIF zu MP4 konvertieren'
  }
};

// Default SEO data for pages not in config
export const defaultSEO: SEOData = {
  title: 'Toolbox24 – Kostenlose Online Tools',
  description: 'Kostenlose Online-Tools für PDF, Bilder und Vorlagen.',
  h1: 'Toolbox24'
};
