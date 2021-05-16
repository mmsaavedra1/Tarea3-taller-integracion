import 'tailwindcss/tailwind.css'


function MyApp({ Component, pageProps }) {

  return (
    <div>
      <div className="container mx-auto my-10">
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp
