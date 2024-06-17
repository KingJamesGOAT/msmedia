import React, { useState, useEffect, useCallback, useMemo } from "react";

const Module = ({ moduleName }) => {
  const courses = useMemo(
    () => ({
      AnaStraMar: [
        { name: "AnalysMar", weight: 60 },
        { name: "MarkDig2", weight: 50 },
      ],
      BasPratCom: [
        { name: "ComVisuel", weight: 52 },
        { name: "EcrireWeb", weight: 52 },
        { name: "ProdConMé1", weight: 76 },
      ],
      BaScienCo: [
        { name: "BaseProg2", weight: 41 },
        { name: "BaseMath2", weight: 78 },
        { name: "DeDonAInf2", weight: 13 },
      ],
      EvolMetMed: [
        { name: "Droit1", weight: 43 },
        { name: "EvolMetMed", weight: 180 },
      ],
      GesBudget: [
        { name: "GesBudget", weight: 49 },
        { name: "PilotFin", weight: 33 },
      ],
      TecWeb: [
        { name: "InfraDon1", weight: 63 },
        { name: "ProgServ1", weight: 32 },
      ],
    }),
    []
  );

  const [grades, setGrades] = useState({});
  const [totalWeightedNote, setTotalWeightedNote] = useState(0);
  const [finalNote, setFinalNote] = useState(0);

  useEffect(() => {
    const savedGrades = localStorage.getItem(moduleName);
    if (savedGrades) {
      setGrades(JSON.parse(savedGrades));
    }
  }, [moduleName]);

  const calculateGrades = useCallback(() => {
    let totalWeight = 0;
    let totalWeighted = 0;

    courses[moduleName]?.forEach((course) => {
      const note = grades[course.name] || 0;
      totalWeighted += note * course.weight;
      totalWeight += course.weight;
    });

    setTotalWeightedNote(totalWeighted);
    setFinalNote(totalWeighted / totalWeight);
  }, [grades, moduleName, courses]);

  useEffect(() => {
    calculateGrades();
  }, [grades, calculateGrades]);

  const handleInputChange = (course, value) => {
    const newGrades = { ...grades, [course]: parseFloat(value) || 0 };
    setGrades(newGrades);
    localStorage.setItem(moduleName, JSON.stringify(newGrades));
  };

  return (
    <div className="module" style={{ display: moduleName ? "block" : "none" }}>
      <h2>{moduleName}</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Course</th>
              <th>Weight</th>
              <th>Note</th>
              <th>Weighted Note</th>
            </tr>
          </thead>
          <tbody>
            {courses[moduleName]?.map((course, index) => (
              <tr key={index}>
                <td>{course.name}</td>
                <td className="weight">{course.weight}</td>
                <td>
                  <input
                    type="number"
                    className="note-input"
                    data-weight={course.weight}
                    value={grades[course.name] || ""}
                    onChange={(e) =>
                      handleInputChange(course.name, e.target.value)
                    }
                    aria-label={`${course.name} Note`}
                  />
                </td>
                <td className="weighted-note">
                  {((grades[course.name] || 0) * course.weight) / 100}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3">Total Weighted Note</td>
              <td>{totalWeightedNote}</td>
            </tr>
            <tr>
              <td colSpan="3">Final Note</td>
              <td>{finalNote.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Module;
