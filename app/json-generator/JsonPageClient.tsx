'use client'

import { useState } from "react";
import { type pic } from "@/_data/pic"; // Your custom 'pic' type
import exifr from 'exifr';
import { iso1A2Code } from "@rapideditor/country-coder";
import styles from "./json.module.css";

export default function JsonPageClient() {
  // We need to store files and output in React's state to update the UI.
  const [files, setFiles] = useState<File[]>([]);
  const [outputJson, setOutputJson] = useState<pic[]>();

  // This function runs when the user selects files.
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  // This function processes the files and generates the JSON.
  const generateJson = async () => {
    const generatedPics: pic[] = [];

    for (const file of files) {


      try {
        // exifr parses the File object directly.
        const exif = await exifr.parse(file);

        const originalDate = exif.DateTimeOriginal
        let formattedDate = '';

        if (originalDate) {
            formattedDate = originalDate.toLocaleString('en-US', {
              month: 'long', // "July"
              year: 'numeric', // "2025"
            });
          }

        if (exif?.latitude && exif?.longitude) {
          // Use the new library. It expects [longitude, latitude].
          const countryCode = iso1A2Code([exif.longitude, exif.latitude]);

          const newPic: pic = {
            src: `/twpics/${file.name}`,
            country: countryCode ?? "", // The library returns the 2-letter UPPERCASE country code.
            date: formattedDate
          };
          generatedPics.push(newPic);
        }
      } catch (error) {
        // This will catch errors for individual files and log them,
        // without stopping the whole process.
        console.error(`Could not process file ${file.name}:`, error);
      }
    }
    
    // After the loop, update the state once with all the new data.
    setOutputJson(generatedPics);
  };

  return (
<div className={styles.contentArea}>
  <div className={styles.inputArea}>
    {/* We hide the actual file input and style the label.
      The `htmlFor` attribute connects the label to the input.
    */}
    <label htmlFor="file-upload" className={styles.fileInputLabel}>
      Select Images
    </label>
    <input
      id="file-upload"
      className={styles.fileInput}
      type="file"
      multiple
      onChange={handleFileChange}
      accept="image/jpeg,image/png,image/heic"
    />
    <button
      className={styles.generateButton}
      onClick={generateJson}
      disabled={files.length === 0}
    >
      Generate JSON
    </button>
  </div>
  
  <div className="output">
    {/* To display the array of objects, we turn it into a formatted string. */}
    <pre className={styles.outputPre}>
      <code>
        {outputJson 
          ? JSON.stringify(outputJson, null, 2)
          : 'JSON output will appear here...'}
      </code>
    </pre>
  </div>
</div>
  );
}
