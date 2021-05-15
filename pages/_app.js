import '../styles/index.css'


function MyApp({ Component, pageProps }) {
  return (
    <div>
      <div className="container mx-auto my-10">
        <Component {...pageProps} />
      </div>
      <div className="container mx-20 my-20 text-center">
        <div class="grid grid-cols-6 gap-4">
          <div class="col-start-1 col-end-5 ...">
            Mapa
          </div>
          <div class="col-end-7 col-span-2 ...">
            Chat
          </div>
          <div class="col-start-2 col-span-4 ...">
            Info
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyApp
