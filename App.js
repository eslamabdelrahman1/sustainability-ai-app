
import { useState } from "react";
import { Card, CardContent } from "@mui/material";
import { Button } from "@mui/material";
import { Textarea } from "@mui/material";

export default function SustainabilityAnalyzer() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const handleAnalyze = () => {
    const score = {
      "العامل 1": 0,
      "العامل 2": 0,
      "العامل 3": 0,
      "العامل 4": 0,
      "العامل 5": 0,
    };

    const patterns = [
      // العامل 1
      [/نظام (?:إدارة بيئية|بيئي) موثق.*ISO 14001/i, 2],
      [/لجنة.*بمجلس الإدارة.*القضايا الاجتماعية والبيئية والسلامة/i, 1],
      [/مدير.*مسؤول.*الإدارة اليومية.*البيئية والاجتماعية/i, 1],
      [/أهداف.*البيئية والاجتماعية.*مكافآت.*المديرين التنفيذيين/i, 1],
      [/تدريب.*الموظفين.*الإدارة البيئية والتنمية الاجتماعية/i, 1],
      [/جوائز.*هيئات.*الصناعة.*الاستدامة/i, 2],

      // العامل 2
      [/تلتزم الشركة بنسبة\s*(100|70|50)%\s*من مبادئ ASC/i, (m) => (m[1] === "100" ? 3 : m[1] === "70" ? 2 : 1)],
      [/لجنة.*حوكمة.*مجلس الإدارة/i, 1],
      [/جوائز.*حوكمة الشركات/i, 1],

      // العامل 3
      [/سياسة.*الكفاءة.*البيئية.*مفعّلة.*استراتيجي/i, 1],
      [/استثمار.*التكنولوجيا.*البيئية.*نتائج قابلة للقياس/i, 1],
      [/البحث والتطوير البيئي.*تشارك نتائجه/i, 1],
      [/أهداف.*الأداء البيئي.*مراجعتها.*تتبعها/i, 1],
      [/إفصاح.*انبعاثات.*تقرير ESG/i, 1],
      [/اتفاقيات تعاون.*الأداء البيئي/i, 1],

      // العامل 4
      [/دعم.*جمعيات مجتمعية.*مشاركة الموظفين.*استمرار الدعم/i, 1],
      [/برامج دعم مجتمعية.*استراتيجية.*تقييم/i, 1],
      [/مشاركة موظفي الشركة.*تنمية المجتمع.*توثيق الأثر/i, 1],
      [/تمويل.*مشاريع التنمية المجتمعية.*ميزانية.*شراكات/i, 1],

      // العامل 5
      [/نظام.*الصحة والسلامة.*ISO 45001/i, 1],
      [/خطة مكتوبة.*إجراءات الحماية.*تدريب/i, 1],
      [/تدريب.*السلامة.*مستمر/i, 1],
      [/قنوات اتصال فعّالة.*اقتراحات|لجان عمالية|تطبيقات رقمية/i, 1],
    ];

    patterns.forEach((pattern, index) => {
      const value = typeof pattern[1] === "function"
        ? pattern[1](input.match(pattern[0]))
        : input.match(pattern[0]) ? pattern[1] : 0;

      if (index < 6) score["العامل 1"] += value;
      else if (index < 9) score["العامل 2"] += value;
      else if (index < 15) score["العامل 3"] += value;
      else if (index < 19) score["العامل 4"] += value;
      else score["العامل 5"] += value;
    });

    setResult(score);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <Textarea
        rows={10}
        placeholder="ألصق تقرير الاستدامة هنا..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button onClick={handleAnalyze}>تحليل التقرير</Button>
      {result && (
        <Card>
          <CardContent className="space-y-2 p-4">
            {Object.entries(result).map(([k, v]) => (
              <div key={k}>
                <strong>{k}:</strong> {v} نقطة
              </div>
            ))}
            <hr />
            <div>
              <strong>الإجمالي:</strong> {Object.values(result).reduce((a, b) => a + b, 0)} / 27
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
