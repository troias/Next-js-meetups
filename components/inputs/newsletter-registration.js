import classes from './newsletter-registration.module.css';
import { useContext} from 'react'
import NotificationContext from '../../contextStore/notification-context'
import { useRef } from 'react'
function NewsletterRegistration() {
  const notificationCtx = useContext(NotificationContext)
  const emailRef = useRef();

  const registrationHandler = async (event) => {
    event.preventDefault();
    
    const enteredEmail = emailRef.current.value;

    const email = {
      email: enteredEmail,
    }
    notificationCtx.showNotification({
      title: "signing up",
      message: "starting registration for news letter",
      status: "pending"})

      try {
        const req = await fetch('/api/news-letter',
        { method: 'POST', body: JSON.stringify(email), header: { 'Content-Type': 'application/json' } })
        
        if (!req.ok) {
          throw new Error("failed")
        }
        
        const response = await req.json()
       
        notificationCtx.showNotification({
          title: "registration complete",
          message: "finished registration",
          status: "success"})

      } catch (error) {
        notificationCtx.showNotification({
          title: "registration failed",
          message: error.message || "failed to register",
          status: "error"})
      }
    
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