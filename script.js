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

    // Metin ayarları
    ctx.font = 'bold 72px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    
    // Metni ortadaki boşluğa yerleştir
    const lines = text.split('\n');
    let y = canvas.height / 2 - (lines.length * 85) / 2;
    
    lines.forEach(line => {
        ctx.fillText(line, canvas.width * 0.3, y);
        y += 85;
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
