"use client";

import { useState, useRef } from "react";
import {
  Upload,
  Camera,
  Loader2,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Leaf,
  Bug,
  Droplets,
} from "lucide-react";

interface Prediction {
  label: string;
  confidence: number;
  type: "disease" | "pest" | "deficiency" | "healthy";
  description: string;
}

interface AnalysisResult {
  overallHealth: "healthy" | "warning" | "critical";
  predictions: Prediction[];
  recommendations: string[];
}

export default function AnalyzePage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setSelectedImage(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setSelectedImage(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setAnalyzing(true);

    try {
      // In production, this would call the API:
      // const result = await api.analyzeImage(selectedFile);
      // For demo, simulate AI analysis:
      await new Promise((resolve) => setTimeout(resolve, 2500));

      setResult({
        overallHealth: "warning",
        predictions: [
          {
            label: "Yaprak Yanıklığı (Alternaria)",
            confidence: 87,
            type: "disease",
            description:
              "Yapraklarda kahverengi-siyah lekeler tespit edildi. Alternaria fungal enfeksiyonu belirtileri görülmektedir.",
          },
          {
            label: "Azot Eksikliği",
            confidence: 62,
            type: "deficiency",
            description:
              "Alt yapraklarda sararma belirtileri, olası azot eksikliğine işaret etmektedir.",
          },
        ],
        recommendations: [
          "Etkilenen yaprakları uzaklaştırın ve imha edin",
          "Bakır bazlı fungisit uygulayın",
          "Azotlu gübre takviyesi yapın (üre veya amonyum sülfat)",
          "Sulama sıklığını azaltın, yaprak ıslaklığından kaçının",
          "Bitkilerin havalanmasını iyileştirin",
        ],
      });
    } catch {
      alert("Analiz sırasında bir hata oluştu");
    } finally {
      setAnalyzing(false);
    }
  };

  const getHealthIcon = (health: string) => {
    switch (health) {
      case "healthy":
        return <CheckCircle className="w-8 h-8 text-green-500" />;
      case "warning":
        return <AlertTriangle className="w-8 h-8 text-yellow-500" />;
      case "critical":
        return <XCircle className="w-8 h-8 text-red-500" />;
    }
  };

  const getHealthLabel = (health: string) => {
    switch (health) {
      case "healthy":
        return { text: "Sağlıklı", color: "text-green-600 bg-green-50" };
      case "warning":
        return { text: "Dikkat Gerekli", color: "text-yellow-600 bg-yellow-50" };
      case "critical":
        return { text: "Kritik Durum", color: "text-red-600 bg-red-50" };
    }
    return { text: "", color: "" };
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "disease":
        return <Leaf className="w-5 h-5 text-red-500" />;
      case "pest":
        return <Bug className="w-5 h-5 text-orange-500" />;
      case "deficiency":
        return <Droplets className="w-5 h-5 text-blue-500" />;
      case "healthy":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Bitki Analizi
        </h1>
        <p className="text-muted-foreground">
          Bitki fotoğrafınızı yükleyin, yapay zeka ile hastalık, zararlı ve besin
          eksikliği tespiti yapın.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Area */}
        <div>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors ${
              selectedImage
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary hover:bg-muted"
            }`}
          >
            {selectedImage ? (
              <div className="space-y-4">
                <img
                  src={selectedImage}
                  alt="Yüklenen bitki"
                  className="max-h-64 mx-auto rounded-xl object-cover"
                />
                <p className="text-sm text-muted-foreground">
                  Değiştirmek için tıklayın
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                  <Upload className="w-8 h-8 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    Fotoğraf yükleyin veya sürükleyin
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    PNG, JPG, WEBP (max 10MB)
                  </p>
                </div>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          <button
            onClick={handleAnalyze}
            disabled={!selectedFile || analyzing}
            className="w-full mt-4 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {analyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analiz ediliyor...
              </>
            ) : (
              <>
                <Camera className="w-5 h-5" />
                Analiz Et
              </>
            )}
          </button>
        </div>

        {/* Results Area */}
        <div>
          {result ? (
            <div className="space-y-5">
              {/* Overall Health */}
              <div className="bg-card border border-border rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  {getHealthIcon(result.overallHealth)}
                  <div>
                    <h3 className="font-semibold text-card-foreground">
                      Genel Durum
                    </h3>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-1 ${getHealthLabel(result.overallHealth).color}`}
                    >
                      {getHealthLabel(result.overallHealth).text}
                    </span>
                  </div>
                </div>
              </div>

              {/* Predictions */}
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="font-semibold text-card-foreground mb-4">
                  Tespit Sonuçları
                </h3>
                <div className="space-y-4">
                  {result.predictions.map((pred, i) => (
                    <div key={i} className="flex items-start gap-3">
                      {getTypeIcon(pred.type)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium text-card-foreground text-sm">
                            {pred.label}
                          </p>
                          <span className="text-xs font-medium text-primary">
                            {pred.confidence}%
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-1.5 mb-2">
                          <div
                            className="bg-primary rounded-full h-1.5 transition-all"
                            style={{ width: `${pred.confidence}%` }}
                          />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {pred.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="font-semibold text-card-foreground mb-3">
                  Öneriler
                </h3>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="text-primary font-bold mt-0.5">
                        {i + 1}.
                      </span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-2xl p-8 text-center">
              <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-card-foreground mb-2">
                Analiz Sonuçları
              </h3>
              <p className="text-sm text-muted-foreground">
                Bir bitki fotoğrafı yükleyip &quot;Analiz Et&quot; butonuna tıklayın.
                AI modelimiz hastalık, zararlı ve besin eksikliği tespiti yapacaktır.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
