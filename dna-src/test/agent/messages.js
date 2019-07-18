module.exports = scenario => {

  const testMessage = {
    timestamp: 0,
    message_type: "text",
    payload: "I am the message payload",
    meta: "{}",
  }

  const testNewChannelParams = {
    name: "test new stream",
    description: "for testing...",
    initial_members: [],
    public: true
  }

  scenario('Can post a message to the stream and retrieve', async (s, t, {chat_instance}) => {

    const register_result = await chat_instance.call('chat', 'register', {name: 'chat_instance', avatar_url: ''})
    console.log(register_result)
    t.equal(register_result.Ok.length, 63)

    const create_result = await chat_instance.call('chat', 'create_stream', testNewChannelParams)
    console.log(create_result)
    const stream_addr = create_result.Ok
    t.deepEqual(stream_addr.length, 46)

    const post_result = await chat_instance.call('chat', 'post_message', {stream_address: stream_addr, message: testMessage})
    console.log(post_result)
    t.notEqual(post_result.Ok, undefined, 'post should return Ok')

    const get_message_result = await chat_instance.call('chat', 'get_messages', {address: stream_addr})
    console.log(get_message_result)
    t.deepEqual(get_message_result.Ok[0].entry.payload, testMessage.payload, 'expected to receive the message back')
  })
}
