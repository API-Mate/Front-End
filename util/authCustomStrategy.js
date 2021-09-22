import Jsona from 'jsona'
import LocalScheme from '~/node_modules/@nuxtjs/auth/lib/schemes/local'

export default class CustomScheme extends LocalScheme {
  // Deserialize user from json:api format
  formatUser(user) {
    // const dataFormatter = new Jsona()
    // return dataFormatter.deserialize(user)
    return user
  }

  async fetchUser(endpoint) {
    // Token is required but not available
    console.log('fetchUser')
    if (this.options.tokenRequired && !this.$auth.getToken(this.name)) {
      console.log('fetchUser1')

      return
    }
    console.log(this.$auth.user)
    console.log(this.$auth.getToken(this.name))
    console.log(this.options)


    // User endpoint is disabled.
    if (!this.options.endpoints.user) {
      console.log('fetchUser2')
      this.$auth.setUser({})
      return
    }

    // Try to fetch user and then set
    const user = await this.$auth.requestWith(
      this.name,
      endpoint,
      this.options.endpoints.user
    )

    console.log('fetchUser3')
    console.log(user)

    if (user) {
      Promise.resolve(this.formatUser(user)).then((formattedUser) => {
        console.log('fetchUser4')
        console.log(formattedUser)
        this.$auth.setUser(formattedUser)
      })
    }
  }
}
