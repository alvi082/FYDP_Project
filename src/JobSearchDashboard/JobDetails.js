import React from "react";

const JobDetails = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="bg-blue-600 text-white p-6 text-center">
                    <h2 className="text-3xl font-semibold">Software Engineer</h2>
                    <p className="text-lg mt-2">Tech Innovators Inc.</p>
                </div>

                <div className="p-6 space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800">Job Description</h3>
                        <p className="text-gray-600 mt-2">
                            We are looking for a passionate Software Engineer to design, develop, and maintain software solutions.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-gray-800">Responsibilities</h3>
                        <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2">
                            <li>Develop and maintain web applications.</li>
                            <li>Write clean, efficient, and scalable code.</li>
                            <li>Collaborate with cross-functional teams.</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-gray-800">Requirements</h3>
                        <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2">
                            <li>Bachelor’s degree in Computer Science.</li>
                            <li>Proficiency in JavaScript, React, and Node.js.</li>
                            <li>Experience with databases like PostgreSQL or MongoDB.</li>
                        </ul>
                    </div>

                    <div className="flex justify-between items-center bg-gray-50 p-4 rounded-md">
                        <span className="text-gray-700 text-lg font-medium">Salary: $80,000 - $100,000</span>
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                            Apply Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;
