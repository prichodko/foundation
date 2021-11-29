import { useEffect, useState } from 'react'

type Props = {}

export const ShareButtons = (_props: Props) => {
  const [url, setUrl] = useState('')

  useEffect(() => {
    setUrl(window.location.href)
  }, [])

  return (
    <div className="flex gap-4 mr-8">
      <a
        href={`https://facebook.com/sharer/sharer.php?u=${url}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className="flex items-center bg-[#1877F2] hover:bg-blue-700 text-white text-12 font-600 py-2 px-4 rounded" // #1DA1F2
      >
        <svg
          width={17}
          height={17}
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2"
        >
          <path
            d="M17 8.553C17 3.832 13.192 0 8.5 0S0 3.832 0 8.553C0 12.825 3.108 16.366 7.178 17v-5.98h-2.17V8.552h2.17V6.668c0-2.14 1.26-3.33 3.204-3.33.928 0 1.89.177 1.89.177v2.087h-1.067c-1.06 0-1.392.67-1.392 1.339v1.603h2.364L11.8 11.01H9.813v5.981C13.893 16.366 17 12.825 17 8.553z"
            fill="currentColor"
          />
        </svg>
        Share
      </a>

      <a
        href={`https://twitter.com/intent/tweet/?text=${url}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Twitter"
        className="flex items-center bg-[#1DA1F2] hover:bg-blue-700 text-white text-12 font-600 py-2 px-4 rounded" // #1DA1F2
      >
        <svg
          width={18}
          height={14}
          viewBox="0 0 18 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2"
        >
          <path
            d="M5.66 14c6.793 0 10.508-5.387 10.508-10.058 0-.153 0-.305-.01-.457A7.343 7.343 0 0018 1.655a7.63 7.63 0 01-2.121.556A3.58 3.58 0 0017.503.256a7.604 7.604 0 01-2.346.858A3.75 3.75 0 0013.062.047a3.84 3.84 0 00-2.341.372 3.606 3.606 0 00-1.623 1.658 3.4 3.4 0 00-.234 2.261 10.854 10.854 0 01-4.216-1.072A10.413 10.413 0 011.253.645 3.407 3.407 0 00.848 3.22a3.541 3.541 0 001.548 2.143A3.791 3.791 0 01.72 4.92v.045c0 .816.295 1.607.835 2.239A3.727 3.727 0 003.683 8.43a3.847 3.847 0 01-1.668.061 3.548 3.548 0 001.314 1.757c.619.44 1.366.684 2.137.698a7.624 7.624 0 01-4.587 1.516c-.294 0-.587-.018-.879-.05a10.799 10.799 0 005.66 1.584"
            fill="currentColor"
          />
        </svg>
        Tweet
      </a>
    </div>
  )
}
