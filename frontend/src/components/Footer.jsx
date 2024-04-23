import React from 'react'

const Footer = () => {

  
  return (
    <div>
      <div className=" min-h-screen grid w-full p-0 m-0 ">
  <header className="flex items-center shadow-lg bg-white border-b border-gray-100 dark:bg-gray-950 dark:border-gray-800">
    <div className="container flex items-center gap-4 px-4 py-2 md:gap-6 md:px-6">
      <a className="flex gap-2 font-semibold items-center dark:text-gray-50" href="#">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="h-6 w-6"
        >
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
          <line x1="4" x2="4" y1="22" y2="15"></line>
        </svg>
        Home
      </a>
      <nav className="flex-1">
        <ul className="flex gap-4 justify-center">
          <li>
            <a
              className="text-white"
              href="#"
            >
              Home
            </a>
          </li>
          <li>
            <a className=" text-white" href="#">
              Leaderboard
            </a>
          </li>
          <li>
            <a className="text-white" href="#">
              Contests
            </a>
          </li>
          <li>
            <a className="text-white" href="#">
              About
            </a>
          </li>
          <li>
            <a className="text-white" href="#">
              Contact
            </a>
          </li>
        </ul>
      </nav>
      <div className="flex items-center gap-4 md:gap-2">
        <a
          className="flex items-center gap-2 text-sm font-medium rounded-md px-3 py-2 text-white"
          href="#"
        >
          Profile
        </a>
      </div>
    </div>
  </header>
  <main className="flex-1 bg-gray-100 py-10 lg:py-16 xl:py-20 dark:bg-gray-850">
    <div className="container py-6 md:py-10 lg:py-14">
      <div className="mx-auto max-w-6xl px-4">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">GGITS Coding Club</h1>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Master the art of coding. Compete with your peers.
            </p>
          </div>
          <div className="mx-auto grid max-w-3xl items-stretch justify-center gap-4">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-sm" data-v0-t="card">
              <div className="p-6 space-y-4 text-center">
                <div className="text-3xl font-semibold">1</div>
                <div className="flex w-full items-center gap-4 mx-auto max-w-xs">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">Alice</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Last submission: 2 minutes ago</p>
                  </div>
                </div>
                <div className="flex w-full items-center gap-4 mx-auto max-w-xs">
                  <div className="text-2xl font-semibold">Points: 2400</div>
                </div>
                <div className="flex w-full items-center gap-4 mx-auto max-w-xs">
                  <div className="text-sm font-semibold">RANK</div>
                  <div className="text-sm font-semibold">NAME</div>
                  <div className="text-sm font-semibold">BRANCH</div>
                  <div className="text-sm font-semibold">BATCH</div>
                  <div className="text-sm font-semibold">SCORE</div>
                  <div className="text-sm font-semibold">RATING</div>
                </div>
              </div>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-sm" data-v0-t="card">
              <div className="p-6 space-y-4 text-center">
                <div className="text-3xl font-semibold">2</div>
                <div className="flex w-full items-center gap-4 mx-auto max-w-xs">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">Bob</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Last submission: 5 minutes ago</p>
                  </div>
                </div>
                <div className="flex w-full items-center gap-4 mx-auto max-w-xs">
                  <div className="text-2xl font-semibold">Points: 2200</div>
                </div>
              </div>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-sm" data-v0-t="card">
              <div className="p-6 space-y-4 text-center">
                <div className="text-3xl font-semibold">3</div>
                <div className="flex w-full items-center gap-4 mx-auto max-w-xs">

                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">Charlie</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Last submission: 10 minutes ago</p>
                  </div>
                </div>
                <div className="flex w-full items-center gap-4 mx-auto max-w-xs">
                  <div className="text-2xl font-semibold">Points: 2000</div>
                </div>
              </div>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-sm" data-v0-t="card">
              <div className="p-6 space-y-4 text-center">
                <div className="text-3xl font-semibold">4</div>
                <div className="flex w-full items-center gap-4 mx-auto max-w-xs">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">David</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Last submission: 15 minutes ago</p>
                  </div>
                </div>
                <div className="flex w-full items-center gap-4 mx-auto max-w-xs">
                  <div className="text-2xl font-semibold">Points: 1800</div>
                </div>
              </div>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-sm" data-v0-t="card">
              <div className="p-6 space-y-4 text-center">
                <div className="text-3xl font-semibold">5</div>
                <div className="flex w-full items-center gap-4 mx-auto max-w-xs">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">Eve</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Last submission: 20 minutes ago</p>
                  </div>
                </div>
                <div className="flex w-full items-center gap-4 mx-auto max-w-xs">
                  <div className="text-2xl font-semibold">Points: 1600</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <footer className="flex items-center bg-white border-t border-gray-100 dark:bg-gray-950 dark:border-gray-800">
    <div className="container flex items-center justify-center gap-4 px-4 py-2 md:gap-6 md:px-6">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Made with love by the Coding Club. All rights reserved.
      </p>
      <div className="ml-auto flex items-center gap-4 md:gap-2">
        <a className="text-sm font-medium rounded-md dark:text-gray-50" href="#">
          Contact Us
        </a>
      </div>
    </div>
  </footer>
</div>
    </div>
  )
}

export default Footer