# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_todoit_session',
  :secret      => 'ad74a2fa783e810376280d599f5f00613c2e2fbd78bac8636370b39a95db56d29f6e5ca317120cd3a7f19b220d630f67f59a18178bcede88c74953173557c109'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
