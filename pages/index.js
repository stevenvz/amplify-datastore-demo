import styles from '../styles/Home.module.css'
import { DataStore } from 'aws-amplify'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Behavior } from '../src/models'

export default function Home() {
  const [behaviors, setBehaviors] = useState([])

  useEffect(() => {
    fetchBehaviors()
    async function fetchBehaviors() {
      const behaviorData = await DataStore.query(Behavior)
      setBehaviors(behaviorData)
    }
    const subscription = DataStore.observe(Behavior).subscribe(() => fetchBehaviors())
    return () => subscription.unsubscribe()
  }, [])
  
  return (
    <div className={styles.container}>
      <h1>Behaviors</h1>
      {
        behaviors.map(behavior => (
          <Link href={`/behaviors/${behavior.id}`}>
            <a>
              <h2>{behavior.title}</h2>
            </a>
          </Link>
        ))
      }
    </div>
  )
}
