import React from 'react';

function About() {
  return (
    <div className="bg-gray-100 py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">About Us</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Welcome to Literacy Ladder Online Book Store
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            We are dedicated to providing a wide range of books for all ages and interests. Our mission is to promote literacy and inspire a love for reading in every individual.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* About Card 1 */}
            <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-8">
                <div className="rounded-full bg-indigo-500 inline-flex items-center justify-center text-white mb-5 w-12 h-12">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8c0-2.209 1.791-4 4-4h10c2.209 0 4 1.791 4 4v8c0 2.209-1.791 4-4 4H7c-2.209 0-4-1.791-4-4V8zm0 0l7 5 7-5"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">Our Mission</h3>
                <p className="text-gray-600">
                  Bringing books to all, we aim to empower the underprivileged through affordable access to quality literature.
                </p>
              </div>
            </div>

            {/* About Card 2 */}
            <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-8">
                <div className="rounded-full bg-indigo-500 inline-flex items-center justify-center text-white mb-5 w-12 h-12">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">Our Vision</h3>
                <p className="text-gray-600">
                  A future where everyone, regardless of background, discover the joy of reading, creating a more inclusive and knowledgeable world.
                </p>
              </div>
            </div>

            {/* About Card 3 */}
            <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-8">
                <div className="rounded-full bg-indigo-500 inline-flex items-center justify-center text-white mb-5 w-12 h-12">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">Our Values</h3>
                <p className="text-gray-600">
                  We are committed to providing exceptional customer service and fostering a welcoming and inclusive community of readers. We believe in the power of literature to educate, inspire, and empower individuals from all walks of life.
                </p>
              </div>
            </div>

            {/* Additional Section */}
            <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-8">
                <div className="rounded-full bg-indigo-500 inline-flex items-center justify-center text-white mb-5 w-12 h-12">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">Our Team</h3>
                <p class="text-gray-600">
                   <span class="font-semibold">Shivendra Singh Thakur</span><br />
                  <span class="font-semibold">Abhinay Verma</span><br />
                  <span class="font-semibold">Shiva Teja</span><br />
                   <span class="font-semibold">Eram Fatma</span>
                </p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
