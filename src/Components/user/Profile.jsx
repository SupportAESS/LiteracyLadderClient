import { FaEdit } from 'react-icons/fa';
import { useState } from 'react';

export default function Example() {
  const sessionData = JSON.parse(localStorage.getItem('session'));
  const [username, setUsername] = useState(sessionData.user.fullName);
  const [email, setEmail] = useState(sessionData.user.email);
  const [isUsernameEditing, setIsUsernameEditing] = useState(false);
  const [isEmailEditing, setIsEmailEditing] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUsernameEdit = () => {
    setIsUsernameEditing(true);
  };

  const handleEmailEdit = () => {
    setIsEmailEditing(true);
  };

  const handleUsernameSave = () => {
    setIsUsernameEditing(false);
  };

  const handleEmailSave = () => {
    setIsEmailEditing(false);
  };

  return (
    <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                User name
              </label>
              <div className="mt-2 flex items-center">
                {isUsernameEditing ? (
                  <input
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                    onBlur={handleUsernameSave}
                    autoFocus
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                ) : (
                  <>
                    <span>{username}</span>
                    <button onClick={handleUsernameEdit} className="ml-2 focus:outline-none">
                      <FaEdit className="h-5 w-5 text-gray-500 hover:text-gray-900" />
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2 flex items-center">
                {isEmailEditing ? (
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={handleEmailSave}
                    autoFocus
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                ) : (
                  <>
                    <span>{email}</span>
                    <button onClick={handleEmailEdit} className="ml-2 focus:outline-none">
                      <FaEdit className="h-5 w-5 text-gray-500 hover:text-gray-900" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          We'll always let you know about important changes, but you pick what else you want to hear about.
        </p>

        <div className="mt-10 space-y-10">
          <fieldset>
            <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
            <div className="mt-6 space-y-6">
              <div className="relative flex gap-x-3">
                <div className="flex h-6 items-center">
                  <input
                    id="comments"
                    name="comments"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="text-sm leading-6">
                  <label htmlFor="comments" className="font-medium text-gray-900">
                    Comments
                  </label>
                  <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                </div>
              </div>
              <div className="relative flex gap-x-3">
                <div className="flex h-6 items-center">
                  <input
                    id="candidates"
                    name="candidates"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="text-sm leading-6">
                  <label htmlFor="candidates" className="font-medium text-gray-900">
                    Candidates
                  </label>
                  <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                </div>
              </div>
              <div className="relative flex gap-x-3">
                <div className="flex h-6 items-center">
                  <input
                    id="offers"
                    name="offers"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="text-sm leading-6">
                  <label htmlFor="offers" className="font-medium text-gray-900">
                    Offers
                  </label>
                  <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                </div>
              </div>
            </div>
          </fieldset>
          <fieldset>
            <legend className="text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend>
            <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
            <div className="mt-6 space-y-6">
              <div className="flex items-center gap-x-3">
                <input
                  id="push-everything"
                  name="push-notifications"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                  Everything
                </label>
              </div>
              <div className="flex items-center gap-x-3">
                <input
                  id="push-email"
                  name="push-notifications"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                  Same as email
                </label>
              </div>
              <div className="flex items-center gap-x-3">
                <input
                  id="push-nothing"
                  name="push-notifications"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                  No push notifications
                </label>
              </div>
            </div>
          </fieldset>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}
