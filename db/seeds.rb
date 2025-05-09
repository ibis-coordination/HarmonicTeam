subdomain = ENV['PRIMARY_SUBDOMAIN'] || ''
tenant = Tenant.find_by(subdomain: subdomain)
if tenant.nil?
  tenant = Tenant.create!(subdomain: subdomain, name: 'Default')
end
user = tenant.admin_users.first
if user.nil?
  user = User.create!(email: "#{SecureRandom.hex(8)}@example.com", name: 'Autogenerated Person (seeds.rb)', user_type: 'person')
  tenant.add_user!(user)
end
if tenant.main_studio.nil?
  tenant.create_main_studio!(created_by: user)
end
