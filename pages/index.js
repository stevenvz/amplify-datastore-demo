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

  const addBehavior = async (e) => {
    e.preventDefault();
    try {
      await DataStore.save(
        new Behavior({
          label: `Behavior ${Math.floor(Math.random() * 100001)}`
        })
      );
      console.log("Behavior saved successfully!");
    } catch (error) {
      console.log("Error saving behavior", error);
    }
  }
  
  return (
    <div className={styles.container}>
      <button onClick={addBehavior}>Add Behavior</button>
      <h1>Behaviors</h1>
      {
        behaviors.map(behavior => (
          <p>{behavior.label}</p>
        ))
      }
    </div>
  )
}
