'use client';

import { useState } from 'react';
import './keyword.css';

// Define the structure of the analysis result
interface AnalysisResult {
  match_score: number;
  missing_keywords: string[];
}

export default function HomePage() {
  const [resume, setResume] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resume: resume,
          job_description: jobDescription,
        }),
      });

      if (!response.ok) {
        // Try to parse the error response from the server
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.error || 'Something went wrong with the analysis.';
        throw new Error(errorMessage);
      }

      const data: AnalysisResult = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to generate the LLM prompt
  const generatePrompt = () => {
    if (!result) return '';
    return `**My Goal:** I need to tailor my resume to better match this job description. Please act as an expert career coach and help me.

**The Job Description is:**
${jobDescription}

**My Current Resume is:**
${resume}

**My automated analysis shows I am missing these key skills from the job description:**
${result.missing_keywords.map(keyword => `- ${keyword}`).join('\n')}

**Your Task:**
Based on all the information above, please suggest specific, concrete changes to my resume. Focus on my "Professional Summary" and "Projects" sections. Show me how I can naturally weave in the missing keywords and better reflect the language and priorities of the job description.
`;
  };

  return (
    <main className="keyword-checker-page">
      <div className="analyzer-container">
        <div className="analyzer-header">
          <h1>Resume & Job Description Analyzer 🤖</h1>
          <p>
            Paste your resume and a job description to get an instant analysis and a tailored prompt for your favorite LLM.
          </p>
        </div>

        <div className="analyzer-grid">
          <div className="textarea-container">
            <label htmlFor="resume">Your Resume</label>
            <textarea
              id="resume"
              className="analyzer-textarea"
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              placeholder="Paste your full resume here..."
            />
          </div>
          <div className="textarea-container">
            <label htmlFor="jobDescription">Job Description</label>
            <textarea
              id="jobDescription"
              className="analyzer-textarea"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full job description here..."
            />
          </div>
        </div>

        <div className="analyzer-button-container">
          <button
            onClick={handleAnalysis}
            disabled={isLoading || !resume || !jobDescription}
            className="analyzer-button"
          >
            {isLoading ? 'Analyzing...' : 'Analyze ✨'}
          </button>
        </div>

        {error && <div className="analyzer-error">{error}</div>}

        {result && (
          <div className="analyzer-results">
            <h2>Analysis Complete!</h2>
            <div className="score-and-keywords">
              <div className="analyzer-score">
                <strong>Match Score</strong>
                <div className="score-value flex-col">
                  {`${(result.match_score * 100).toFixed(1)}%`}
                  <p className='text-2xl'>{result.match_score < .5? "You're cooked" : "Good Luck"}</p>
                </div>
              </div>
              <div className="missing-keywords-container">
                <strong>Missing Keywords</strong>
                <div className="keywords-list">
                  {result.missing_keywords.map((keyword) => (
                    <span key={keyword} className="analyzer-keyword">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="prompt-container">
              <h3>Your Custom LLM Prompt</h3>
              <p>Copy the text below and paste it into ChatGPT, Gemini, Claude, or your LLM of choice.</p>
              <textarea
                readOnly
                className="prompt-textarea"
                value={generatePrompt()}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}