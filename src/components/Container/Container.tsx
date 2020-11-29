import React from 'react'
import './Container.scss'

export const Container: React.FC = ({ children }) => (
  <div className="wrapper">
    <main className="page">
      <section className="page__sc sc">
        <div className="sc__container _container">
          <div className="sc__body">{children}</div>
        </div>
      </section>
    </main>
  </div>
)
