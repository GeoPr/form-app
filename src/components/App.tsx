import React from 'react'
import { Step1 } from './Step1/Step1'
import { Step2 } from './Step2/Step2'
import { Step3 } from './Step3/Step3'
import { Result } from './Result/Result'
import { Container } from './Container/Container'
import { Switch, Route } from 'react-router-dom'
import './App.scss'

const App: React.FC = () => {
  return (
    <Container>
      <Switch>
        <Route exact path="/" component={Step1} />
        <Route path="/step2" component={Step2} />
        <Route path="/step3" component={Step3} />
        <Route path="/result" component={Result} />
      </Switch>
    </Container>
  )
}

export default App
