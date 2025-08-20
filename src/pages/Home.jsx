import React, { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { BlobProvider } from "@react-pdf/renderer";
import Letter from "../components/Letter";

export default function Home() {
  const [sender, setSender] = useState("");
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [signatureDataURL, setSignatureDataURL] = useState(null);
  const [penColor, setPenColor] = useState("#000000");

  const sigCanvasRef = useRef();

  const clearSignature = () => {
    if (sigCanvasRef.current) {
      sigCanvasRef.current.clear();
      setSignatureDataURL(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className=" p-6 ">
          <h1 className="text-3xl font-bold text-center">
            Office Letter Generator
          </h1>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          {/* Sender and Recipient */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700 text-sm uppercase tracking-wide">
                Sender Information
              </label>
              <textarea
                placeholder="Your name, position, company, address"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                rows={3}
                value={sender}
                onChange={(e) => setSender(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700 text-sm uppercase tracking-wide">
                Recipient Information
              </label>
              <textarea
                placeholder="Recipient name, position, company, address"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                rows={3}
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>
          </div>

          {/* Subject */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700 text-sm uppercase tracking-wide">
              Subject Line
            </label>
            <input
              placeholder="Letter subject"
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          {/* Body */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700 text-sm uppercase tracking-wide">
              Letter Content
            </label>
            <textarea
              placeholder="Write your letter content here..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              rows={8}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>

          {/* Signature Section */}
          <div className="border-t border-gray-200 pt-6">
            <label className="block mb-4 font-medium text-gray-700 text-sm uppercase tracking-wide">
              Digital Signature
            </label>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">Pen Color:</span>
                  <input
                    type="color"
                    value={penColor}
                    onChange={(e) => setPenColor(e.target.value)}
                    className="w-8 h-8 p-0 border rounded cursor-pointer shadow-sm"
                  />
                </div>

                <button
                  onClick={clearSignature}
                  className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Clear Signature
                </button>
              </div>

              <SignatureCanvas
                ref={sigCanvasRef}
                penColor={penColor}
                canvasProps={{
                  className:
                    "border-2 border-dashed border-gray-300 rounded-lg w-full h-32 bg-white shadow-inner",
                }}
                onEnd={() =>
                  setSignatureDataURL(
                    sigCanvasRef.current.toDataURL("image/png")
                  )
                }
              />

              <p className="text-xs text-gray-500 mt-2 text-center">
                Draw your signature above
              </p>
            </div>
          </div>

          {/* Download Button */}
          <div className="border-t border-gray-200 pt-6 flex justify-center">
            <BlobProvider
              document={
                <Letter
                  sender={sender || " "}
                  recipient={recipient || " "}
                  subject={subject || " "}
                  body={body || " "}
                  signature={signatureDataURL || null}
                />
              }
            >
              {({ url, loading, error }) =>
                loading ? (
                  <button className="px-8 py-3 rounded-xl text-white bg-blue-600 flex items-center justify-center min-w-[200px]">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Generating PDF...
                  </button>
                ) : (
                  <a
                    href={url}
                    download="office_letter.pdf"
                    className="px-8 py-3 rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-colors flex items-center justify-center min-w-[200px]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Download Letter PDF
                  </a>
                )
              }
            </BlobProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
