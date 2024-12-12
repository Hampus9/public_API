document.addEventListener('DOMContentLoaded', () => {
    const verseBtn = document.getElementById('verse-btn');
    const verseText = document.getElementById('verse-text');
    const verseTranslation = document.getElementById('verse-translation');
    const verseInfo = document.getElementById('verse-info');

    verseBtn.addEventListener('click', fetchRandomVerse);

    async function fetchRandomVerse() {
        try {
            // First, get a random surah
            const surahResponse = await fetch('https://api.alquran.cloud/v1/surah');
            const surahData = await surahResponse.json();
            const randomSurah = surahData.data[Math.floor(Math.random() * surahData.data.length)];

            // Then get a random verse from that surah
            const verseResponse = await fetch(`https://api.alquran.cloud/v1/surah/${randomSurah.number}/editions/quran-uthmani,en.sahih`);
            const verseData = await verseResponse.json();
            
            const randomVerseIndex = Math.floor(Math.random() * verseData.data[0].ayahs.length);
            const arabicVerse = verseData.data[0].ayahs[randomVerseIndex];
            const translatedVerse = verseData.data[1].ayahs[randomVerseIndex];

            // Update the display
            verseText.textContent = arabicVerse.text;
            verseTranslation.textContent = `Translation: ${translatedVerse.text}`;
            verseInfo.textContent = `Surah: ${randomSurah.name} (${randomSurah.englishName}) - Verse ${arabicVerse.numberInSurah}`;

        } catch (error) {
            console.error('Error fetching verse:', error);
            verseText.textContent = 'Error fetching verse. Please try again.';
            verseTranslation.textContent = '';
            verseInfo.textContent = '';
        }
    }
});