
import EmailCopy from '../utilities/EmailCopy'

function Contact() {
  return (
    <>
      {/* Decorative Line */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-highlight"></div>
      
      {/* Contact Content */}
      <div className="flex flex-col items-center text-center">
        {/* Contact Heading */}
        <h2 className="text-2xl font-bold text-gray-800 mt-24 mb-8 uppercase tracking-wide">
          Contact Me
        </h2>
        
        {/* Email Address */}
        <div >
          <EmailCopy />
        </div>
      </div>
      </>

  );
}

export default Contact;
