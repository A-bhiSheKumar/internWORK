
const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
      <nav className='flex justify-between items-center w-full mb-10 pt-3'>
      
       
        <p className='flex flex-1 font-bold font-satoshi text-2xl'>pdfSecrets</p>
        <button 
          type='button' 
          onClick={ () => window.open("https://github.com/A-bhiSheKumar/") }
          className='black_btn'
          >
          GitHub
        </button>
      </nav>

      <h1 className='head_text'>
        Vasoya Brothers Infotech
        <br className='max-md:hidden' />
        <span className='orange_gradient'>secretPDF</span>
      </h1>

      <h2 className='desc'>
      "The Secrets of PDFs reveal a wealth of hidden information, providing a deeper understanding of the document's content and structure."
      </h2>
    </header>
  )
}

export default Hero