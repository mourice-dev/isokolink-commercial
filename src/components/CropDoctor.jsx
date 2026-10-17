import React, { useState } from 'react';
import {
  Stethoscope,
  AlertOctagon,
  CheckCircle,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  RefreshCw
} from 'lucide-react';
import { DIAGNOSTIC_CROPS, DIAGNOSTIC_RULES, DISEASE_PREVENTION_PRODUCTS } from '../data/mockData';

export default function CropDoctor({ onAddToCart }) {
  const [selectedCrop, setSelectedCrop] = useState('potato');
  const [selectedSymptomId, setSelectedSymptomId] = useState(
    DINO_INITIAL_SYMPTOM(selectedCrop)
  );
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState(
    DIAGNOSTIC_RULES['potato'][0]
  );

  function DINO_INITIAL_SYMPTOM(crop) {
    const list = DIAGNOSTIC_RULES[crop] || [];
    return list.length > 0 ? list[0].id : '';
  }

  const handleCropChange = (cropId) => {
    setSelectedCrop(cropId);
    const cropRules = DIAGNOSTIC_RULES[cropId] || [];
    if (cropRules.length > 0) {
      setSelectedSymptomId(cropRules[0].id);
      setDiagnosisResult(cropRules[0]);
    } else {
      setSelectedSymptomId('');
      setDiagnosisResult(null);
    }
  };

  const handleSymptomSelect = (e) => {
    const symId = e.target.value;
    setSelectedSymptomId(symId);
    setIsDiagnosing(true);
    setTimeout(() => {
      const cropRules = DIAGNOSTIC_RULES[selectedCrop] || [];
      const match = cropRules.find((r) => r.id === symId);
      setDiagnosisResult(match || null);
      setIsDiagnosing(false);
    }, 250);
  };

  const currentRules = DIAGNOSTIC_RULES[selectedCrop] || [];

  return (
    <div className="crop-doctor-banner">
      <div className="doctor-inner">
        {/* Left Explanation Column */}
        <div className="doctor-text">
          <div className="doctor-badge">
            <Sparkles size={14} />
            <span>Dokiteri w'Ibihingwa • AI Crop Doctor</span>
          </div>

          <h2>Instant Disease Diagnostic & Prescription</h2>

          <p>
            Do not let blight or armyworm ravage your investment. Identify visible symptoms 
            on your plants, get a certified prevention plan according to Rwanda Agriculture Board (RAB) 
            protocols, and order vetted remedies directly from nearby certified agro-dealers.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1', fontSize: '0.88rem' }}>
              <ShieldCheck size={18} style={{ color: '#34d399' }} />
              <span>Covers Rwanda's top food security crops & cash crops</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1', fontSize: '0.88rem' }}>
              <CheckCircle size={18} style={{ color: '#34d399' }} />
              <span>Immediate dosage calculation & safe harvest intervals</span>
            </div>
          </div>
        </div>

        {/* Right Interactive Symptom Checker Card */}
        <div className="doctor-interactive-card">
          <div className="step-label">Step 1: Choose Affected Crop</div>
          <div className="crop-selector-grid">
            {DIAGNOSTIC_CROPS.map((crop) => (
              <button
                key={crop.id}
                type="button"
                className={`crop-select-btn ${selectedCrop === crop.id ? 'active' : ''}`}
                onClick={() => handleCropChange(crop.id)}
              >
                <span className="icon">{crop.icon}</span>
                <span>{crop.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          <div className="step-label">Step 2: What Symptoms Do You Observe?</div>
          <div className="symptom-select-box">
            <select
              value={selectedSymptomId}
              onChange={handleSymptomSelect}
            >
              {currentRules.map((rule) => (
                <option key={rule.id} value={rule.id}>
                  {rule.symptom}
                </option>
              ))}
            </select>
          </div>

          {/* Diagnostic Result */}
          {isDiagnosing ? (
            <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-muted)' }}>
              <RefreshCw size={24} className="spin-icon" style={{ animation: 'spin 1s linear infinite' }} />
              <p style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>Analyzing pathology markers...</p>
            </div>
          ) : diagnosisResult ? (
            <div className="diagnosis-result-box">
              <div className="result-header">
                <span className="result-disease-name">
                  🔬 {diagnosisResult.diseaseName}
                </span>
                <span className="result-risk-tag">
                  {diagnosisResult.riskLevel}
                </span>
              </div>

              <p style={{ fontSize: '0.8rem', color: '#475569', marginBottom: '0.6rem' }}>
                <strong>Cause:</strong> {diagnosisResult.cause}
              </p>

              <div className="result-remedy">
                <strong>🛡️ Prevention Protocol:</strong> {diagnosisResult.preventiveAction}
              </div>

              <div style={{
                background: '#ffffff',
                border: '1px solid #bbf7d0',
                borderRadius: 'var(--radius-sm)',
                padding: '0.75rem',
                marginBottom: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '0.74rem', color: '#15803d', fontWeight: 700 }}>
                    RECOMMENDED REMEDY:
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--primary-dark)' }}>
                    {diagnosisResult.recommendedProduct}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-light)' }}>
                    Supplier: {diagnosisResult.supplier}
                  </div>
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--amber-dark)' }}>
                  {diagnosisResult.price}
                </div>
              </div>

              <button
                className="btn-buy-prescribed"
                onClick={() => {
                  const targetProd = DISEASE_PREVENTION_PRODUCTS.find(p => p.id === diagnosisResult.productId);
                  if (targetProd) {
                    onAddToCart({
                      id: targetProd.id,
                      title: targetProd.name,
                      price: targetProd.price,
                      unit: targetProd.unit,
                      type: 'disease-defense',
                      supplier: targetProd.agencySupplier
                    });
                  } else {
                    onAddToCart({
                      id: diagnosisResult.id,
                      title: diagnosisResult.recommendedProduct,
                      price: 18500,
                      unit: '1 treatment unit',
                      type: 'disease-defense',
                      supplier: diagnosisResult.supplier
                    });
                  }
                }}
              >
                <ShoppingBag size={16} />
                <span>1-Click Order Prescribed Remedy</span>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
