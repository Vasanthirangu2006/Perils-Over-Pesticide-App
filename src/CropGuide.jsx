import React, { useState } from 'react';
import './CropGuide.css';

const cropDetails = {
  Wheat: {
    image: 'https://pest-spotter-guide.lovable.app/assets/crop-wheat-BqC-EBLC.jpg',
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
  { pest: 'Aphids', name: 'Imidacloprid', dosage: '100 ml in 200 liters of water', areaUsed: 'Per acre' },
  { pest: 'Rust Fungus', name: 'Propiconazole', dosage: '200 ml 200 liters of water', areaUsed: 'Per acre' },
  { pest: 'Armyworms', name: 'Lambda-cyhalothrin', dosage: '200 ml 150 liters of water', areaUsed: 'per acre' }
]

  },
  Rice: {
    image: 'https://pest-spotter-guide.lovable.app/assets/crop-rice-CnXXWOVJ.jpg',
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
  { pest: 'Stem Borers', name: 'Cartap hydrochloride', dosage: '400 gm 200 liters of water', areaUsed: 'Per acre' },
  { pest: 'Leaf Folders', name: 'Chlorpyrifos', dosage: '400 ml 200 liters of water', areaUsed: 'Per acre' },
  { pest: 'Brown Planthopper', name: 'Buprofezin', dosage: '400 ml 200 liters of water', areaUsed: 'per acre' }
]

  },
  Tomato: {
    image: 'https://pest-spotter-guide.lovable.app/assets/crop-tomato-B69MkkMT.jpg',
    growingTips: [
      'Use raised beds for drainage',
      'Prune regularly to improve airflow',
      'Apply compost tea weekly',
      'Use drip irrigation to avoid fungal issues',
      'Maintain spacing of 60x45 cm',
      'Stake plants to prevent fruit rot'
    ],
    naturalMethods: [
      'Intercrop with marigold to repel pests',
      'Use sticky traps for whiteflies',
      'Spray neem + soap solution',
      'Apply fermented cow dung solution',
      'Use garlic-chili extract as foliar spray',
      'Grow basil nearby to deter insects'
    ],
    pesticides: [
  { pest: 'Whitefly', name: 'Acetamiprid', dosage: '80g in 200 liters of water', areaUsed: 'Per acre' },
  { pest: 'Fruit Borer', name: 'Spinosad', dosage: '160 ml in 200 liters of water', areaUsed: 'Per acre' },
  { pest: 'Early Blight', name: 'Mancozeb', dosage: '600 gm in 200 liters of water', areaUsed: 'per acre' }
]

  },
  Cotton: {
    image: 'https://pest-spotter-guide.lovable.app/assets/crop-cotton-CtpEfbqD.jpg',
    growingTips: [
      'Sow early to avoid bollworm peak',
      'Use balanced fertilization',
      'Avoid water stress during flowering',
      'Maintain spacing of 90x60 cm',
      'Apply compost before sowing',
      'Use Bt cotton for pest resistance'
    ],
    naturalMethods: [
      'Apply neem cake to soil',
      'Use trap crops like sunflower',
      'Spray cow urine + turmeric solution',
      'Grow intercrops like pigeon pea',
      'Use pheromone traps for bollworms',
      'Manual removal of infested leaves'
    ],
    pesticides: [
  { pest: 'Bollworms', name: 'Spinosad', dosage: '160 ml in 200 liters of water', areaUsed: 'Per acre' },
  { pest: 'Aphids', name: 'Thiamethoxam', dosage: '80 gm in 200 liters of water', areaUsed: 'per acre' },
  { pest: 'Jassids', name: 'Imidacloprid', dosage: '100 ml in 200 liters of water', areaUsed: 'Per acre' }
]

  },
  Millets: {
    image: 'https://agritech.tnau.ac.in/agriculture/CropProduction/Millets/millets-photos/sorghum.JPG',
    growingTips: [
      'Use drought-tolerant varieties',
      'Sow early in the season',
      'Apply organic manure before sowing',
      'Maintain spacing of 25x10 cm',
      'Use seed treatment with Trichoderma',
      'Irrigate only during critical stages'
    ],
    naturalMethods: [
      'Intercrop with legumes',
      'Use neem seed extract spray',
      'Manual weeding to reduce competition',
      'Apply cow dung slurry',
      'Use ash dusting for pest control',
      'Grow border crops like castor'
    ],
    pesticides: [
  { pest: 'Shoot Fly', name: 'Quinalphos', dosage: '400 ml in 200 liters of water', areaUsed: 'Per acre' },
  { pest: 'Stem Borer', name: 'Carbofuran', dosage: '10 kg broadcast (no water spray needed)', areaUsed: 'per acre' },
  { pest: 'Armyworm', name: 'Cypermethrin', dosage: '200 ml in 150 litres of water', areaUsed: 'Per acre' }
]

  }
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

          {showClimate && selectedCrop && cropDetails[selectedCrop]?.climate && (
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

          <div className="top-buttons">
  <button onClick={() => setShowClimate(!showClimate)}>🌦️ Climate Conditions</button>
  <button onClick={() => document.getElementById('leafUpload').click()}>📸 Pest Detection</button>
  <input
    type="file"
    accept="image/*"
    id="leafUpload"
    style={{ display: 'none' }}
    onChange={(e) => {
      const file = e.target.files[0];
      if (file) {
        setLeafImage(URL.createObjectURL(file));
        alert('Leaf image uploaded. Pest detection coming soon!');
      }
    }}
  />
</div>
ho
        </div>
      )}
    </div>
  );
}


export default CropGuide;
