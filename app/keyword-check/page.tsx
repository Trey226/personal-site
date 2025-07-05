'use client'; // This marks the component as a Client Component

import { useState } from 'react';

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
        throw new Error('Something went wrong with the analysis.');
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
    return `
**My Goal:** I need to tailor my resume to better match this job description. Please act as an expert career coach and help me.

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
    <main className="container mx-auto p-8 font-sans">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Resume & Job Description Analyzer 🤖</h1>
        <p className="text-lg text-gray-600">
          Paste your resume and a job description to get an instant analysis and a tailored prompt for your favorite LLM.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div>
          <label htmlFor="resume" className="block text-lg font-medium mb-2">Your Resume</label>
          <textarea
            id="resume"
            className="w-full h-96 p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            placeholder="Paste your full resume here..."
          />
        </div>
        <div>
          <label htmlFor="jobDescription" className="block text-lg font-medium mb-2">Job Description</label>
          <textarea
            id="jobDescription"
            className="w-full h-96 p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the full job description here..."
          />
        </div>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={handleAnalysis}
          disabled={isLoading || !resume || !jobDescription}
          className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-xl hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
        >
          {isLoading ? 'Analyzing...' : 'Analyze ✨'}
        </button>
      </div>

      {error && <div className="mt-8 p-4 bg-red-100 text-red-700 rounded-md text-center">{error}</div>}

      {result && (
        <div className="mt-12 p-6 bg-gray-50 rounded-lg border">
          <h2 className="text-2xl font-bold mb-4">Analysis Complete!</h2>
          <div className="text-xl mb-4">
            <strong>Match Score:</strong>
            <span className="font-mono bg-blue-100 text-blue-800 py-1 px-3 rounded-md ml-2">
              {`${(result.match_score * 100).toFixed(2)}%`}
            </span>
          </div>
          <div className="mb-6">
            <strong className="text-xl">Missing Keywords from Job Description:</strong>
            <div className="flex flex-wrap gap-2 mt-2">
              {result.missing_keywords.map((keyword) => (
                <span key={keyword} className="bg-yellow-100 text-yellow-800 text-sm font-medium px-2.5 py-1 rounded">
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-2">Your Custom LLM Prompt:</h3>
            <p className="mb-4 text-gray-600">Copy the text below and paste it into ChatGPT, Gemini, Claude, or your LLM of choice.</p>
            <textarea
              readOnly
              className="w-full h-80 p-4 font-mono text-sm bg-gray-900 text-white rounded-md"
              value={generatePrompt()}
            />
          </div>
        </div>
      )}
    </main>
  );
}