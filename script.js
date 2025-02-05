const canvas = document.getElementById('imageCanvas');
const ctx = canvas.getContext('2d');

// Ana görseli yükle
const mainImage = new Image();
mainImage.src = 'ataturk.jpg';
mainImage.onload = function() {
    // Canvas boyutunu resmin orijinal boyutuna ayarla
    canvas.width = 1280;  // Orijinal resim genişliği
    canvas.height = 720;  // Orijinal resim yüksekliği
    drawImage();
};

function drawImage() {
    // Canvas'ı temizle
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Arka planı siyah yap
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Görseli tam boyutta çiz
    ctx.drawImage(mainImage, 0, 0, canvas.width, canvas.height);
}

function addText() {
    const text = document.getElementById('userText').value;
    if (!text) return;

    // Mevcut görseli yeniden çiz
    drawImage();

    // Metni satırlara böl
    const lines = text.split('\n');
    
    // En uzun satırı bul
    let maxLineLength = 0;
    lines.forEach(line => {
        if (line.length > maxLineLength) maxLineLength = line.length;
    });

    // Font boyutunu hesapla
    let fontSize = 72; // Başlangıç font boyutu
    const maxWidth = canvas.width * 0.5; // Maksimum genişlik
    
    // Font boyutunu ayarla
    ctx.font = `bold ${fontSize}px Arial`;
    let textWidth = ctx.measureText(lines[0]).width;
    
    // Eğer metin çok uzunsa font boyutunu küçült
    while (textWidth > maxWidth && fontSize > 20) {
        fontSize -= 2;
        ctx.font = `bold ${fontSize}px Arial`;
        textWidth = ctx.measureText(lines[0]).width;
    }

    // Metin ayarları
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    
    // Satır aralığını font boyutuna göre ayarla
    const lineHeight = fontSize * 1.2;
    
    // Metni ortadaki boşluğa yerleştir
    let y = canvas.height / 2 - (lines.length * lineHeight) / 2;
    
    lines.forEach(line => {
        ctx.fillText(line, canvas.width * 0.3, y);
        y += lineHeight;
    });
}

function downloadImage() {
    const link = document.createElement('a');
    link.download = 'ataturk-mesaj.png';
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
} 
