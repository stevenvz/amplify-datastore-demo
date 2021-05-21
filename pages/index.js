import styles from '../styles/Home.module.css'
import { DataStore } from 'aws-amplify'
import { useState, useEffect } from 'react'
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

  const deleteBehavior = (id) => async (e) => {
    e.preventDefault();
    try {
      await DataStore.delete(Behavior, id);
      console.log("Behavior deleted successfully!");
    } catch (error) {
      console.log("Error deleted behavior", error);
    }
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>Behaviors</h1>
        <div>
          <button onClick={addBehavior} className={styles.button}>Add Behavior</button>
        </div>
      </div>
      {
        behaviors.reverse().map(behavior => (
          <div className={styles.behaviorContainer}>
            <p key={behavior.label} className={styles.behaviorLabel}>{behavior.label}</p>
            <button onClick={deleteBehavior(behavior.id)} className={styles.deleteButton}>Delete</button>
          </div>
        ))
      }
    </div>
  )
}
