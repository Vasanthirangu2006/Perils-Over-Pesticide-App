import React, { useState } from 'react';
import './CropGuide.css';

const cropDetails = {
  Wheat: {
    image: 'https://pest-spotter-guide.lovable.app/assets/crop-wheat-BqC-EBLC.jpg',
    climate: {
      temperature: '15–25°C',
      rainfall: '450–650 mm',
      sunlight: 'Full sun',
      humidity: '40–60%'
    },
    growingTips: [
      'Use certified seeds for better yield',
      'Sow in well-drained loamy soil',
      'Maintain row spacing of 20 cm',
      'Apply compost before sowing',
      'Avoid waterlogging during early growth',
      'Use timely irrigation at crown root stage'
    ],
    naturalMethods: [
      'Crop rotation with legumes',
      'Mulching with straw to retain moisture',
      'Use vermicompost for soil enrichment',
      'Apply fermented cow dung solution',
      'Use biofertilizers like Azospirillum',
      'Manual weeding to reduce competition'
    ],
    pesticides: [
      { pest: 'Aphids', name: 'Imidacloprid', dosage: '0.5 ml/L', areaUsed: 'Per acre' },
      { pest: 'Rust Fungus', name: 'Propiconazole', dosage: '1 ml/L', areaUsed: 'Per acre' },
      { pest: 'Armyworms', name: 'Lambda-cyhalothrin', dosage: '1 ml/L', areaUsed: '1 acre' }
    ]
  },
  Rice: {
    image: 'https://pest-spotter-guide.lovable.app/assets/crop-rice-CnXXWOVJ.jpg',
    climate: {
      temperature: '20–35°C',
      rainfall: '1000–2000 mm',
      sunlight: 'Full sun',
      humidity: 'High'
    },
    growingTips: [
      'Use puddled soil for transplanting',
      'Maintain spacing of 20x15 cm',
      'Flood fields during early growth',
      'Apply compost and green manure',
      'Avoid excess nitrogen to prevent pest outbreaks',
      'Use disease-resistant varieties'
    ],
    naturalMethods: [
      'Introduce fish in paddy fields',
      'Use Azolla for nitrogen fixation',
      'Apply fermented cow dung solution',
      'Use neem seed kernel extract spray',
      'Manual weeding and water management',
      'Grow trap crops like sesame'
    ],
    pesticides: [
      { pest: 'Stem Borers', name: 'Cartap hydrochloride', dosage: '1 gm/L', areaUsed: 'Per acre' },
      { pest: 'Leaf Folders', name: 'Chlorpyrifos', dosage: '2 ml/L', areaUsed: 'Per acre' },
      { pest: 'Brown Planthopper', name: 'Buprofezin', dosage: '1 ml/L', areaUsed: '1 acre' }
    ]
  }
  // Add more crops here as needed
};

function CropGuide() {
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [showClimate, setShowClimate] = useState(false);
  const [leafImage, setLeafImage] = useState(null);

  const handleLeafScan = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLeafImage(URL.createObjectURL(file));
      alert('Leaf image uploaded. Pest detection coming soon!');
    }
  };

  return (
    <div className="guide-container">
      <h1>Crop Guardian</h1>
      <p>Select a crop to view growing tips, methods, and recommendations</p>

      <div className="crop-grid">
        {Object.keys(cropDetails).map((crop) => (
          <div key={crop} className="crop-card" onClick={() => setSelectedCrop(crop)}>
            <img src={cropDetails[crop].image} alt={crop} />
            <h3>{crop}</h3>
          </div>
        ))}
      </div>

      {selectedCrop && (
        <>
          <div className="top-buttons">
            <button onClick={() => setShowClimate(!showClimate)}>🌦️ Climate Conditions</button>
            <button onClick={() => document.getElementById('leafUpload').click()}>📸 Pest Detection</button>
            <input
              type="file"
              accept="image/*"
              id="leafUpload"
              style={{ display: 'none' }}
              onChange={handleLeafScan}
            />
          </div>

          <div className="crop-info">
            <h2>{selectedCrop} Guide</h2>
            <img src={cropDetails[selectedCrop].image} alt={selectedCrop} className="info-image" />

            <div className="tips-grid">
              <div className="tips-block">
                <h3>🌱 Growing Tips</h3>
                <ul>{cropDetails[selectedCrop].growingTips.map((tip, i) => <li key={i}>{tip}</li>)}</ul>
              </div>
              <div className="tips-block">
                <h3>🌿 Natural Farming Methods</h3>
                <ul>{cropDetails[selectedCrop].naturalMethods.map((method, i) => <li key={i}>{method}</li>)}</ul>
              </div>
            </div>

            <div className="info-block">
              <h3>🐛 Pest & Pesticide Recommendations</h3>
              <table className="pesticide-table">
                <thead>
                  <tr>
                    <th>Pest</th>
                    <th>Pesticide</th>
                    <th>Dosage</th>
                    <th>Area Used</th>
                  </tr>
                </thead>
                <tbody>
                  {cropDetails[selectedCrop].pesticides.map((item, i) => (
                    <tr key={i}>
                      <td>{item.pest}</td>
                      <td>{item.name}</td>
                      <td>{item.dosage}</td>
                      <td>{item.areaUsed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {showClimate && cropDetails[selectedCrop]?.climate && (
            <div className="climate-popup">
              <h3>Climate Conditions</h3>
              <ul>
                <li><strong>Temperature:</strong> {cropDetails[selectedCrop].climate.temperature}</li>
                <li><strong>Rainfall:</strong> {cropDetails[selectedCrop].climate.rainfall}</li>
                <li><strong>Sunlight:</strong> {cropDetails[selectedCrop].climate.sunlight}</li>
                <li><strong>Humidity:</strong> {cropDetails[selectedCrop].climate.humidity}</li>
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CropGuide;
