import styles from '../styles/Home.module.css'
import { DataStore } from 'aws-amplify'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Tower } from '../models'

export default function Home() {
  const [towers, setTowers] = useState([])

  useEffect(() => {
    fetchTowers()
    async function fetchTowers() {
      const towerData = await DataStore.query(Tower)
      setTowers(towerData)
    }
    const subscription = DataStore.observe(Tower).subscribe(() => fetchTowers())
    return () => subscription.unsubscribe()
  }, [])
  
  return (
    <div className={styles.container}>
      <h1>Towers</h1>
      {
        towers.map(tower => (
          <Link href={`/towers/${tower.id}`}>
            <a>
              <h2>{tower.title}</h2>
            </a>
          </Link>
        ))
      }
    </div>
  )
}
JavaScript
