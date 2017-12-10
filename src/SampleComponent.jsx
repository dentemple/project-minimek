import React, { Component } from 'react'
import { connect } from 'react-redux'

class SampleComponent extends Component {
  render() {
    const { data, state } = this.props

    return (
      <div>
        <p>Data from Redux: {data}</p>
        <pre style={{ textAlign: 'left', margin: 50 }}>
          {JSON.stringify(state, null, 2)}
        </pre>
      </div>
    )
  }
}

const mapState = state => ({
  data: state.test.data,
  state: state
})

export default connect(mapState)(SampleComponent)
