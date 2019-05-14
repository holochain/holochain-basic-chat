describe('Register 2 agents in 2 instances', function() {

  it('Register your handle with the API and check it shows in the UI', function() {
    var message = {
      "jsonrpc": "2.0",
      "id": 2,
      "method": "call",
      "params": {
          "instance_id": "holo-chat",
          "zome": "chat",
          "function": "register",
          "params": { "name": "philip", "avatar_url": "" }
      }
    }
    cy.request('POST', 'http://localhost:4001', message)
    cy.visit('http://localhost:3000/')
    cy.contains('philip')
  })

  it('Register the second agents handle with the API', function() {
    var message = {
      "jsonrpc": "2.0",
      "id": 2,
      "method": "call",
      "params": {
          "instance_id": "holo-chat",
          "zome": "chat",
          "function": "register",
          "params": { "name": "willem", "avatar_url": "" }
      }
    }
    cy.request('POST', 'http://localhost:4002', message)
  })
})
