import classes from './newsletter-registration.module.css';
import { useRef } from 'react'
function NewsletterRegistration() {
  const emailRef = useRef();

  const registrationHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;

    const email = {
      email: enteredEmail,
    }

    const req = await fetch('/api/news-letter',
      { method: 'POST', body: JSON.stringify(email), header: { 'Content-Type': 'application/json' } })
    
      const response = await req.json()
      console.log(response)

      // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;