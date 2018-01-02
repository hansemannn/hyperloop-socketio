install! 'cocoapods',
         :integrate_targets => false

use_frameworks!
platform :ios, '8.0'

target 'hyperloop-socketio' do
	pod 'Socket.IO-Client-Swift', '~> 12.1.3'

	# Enable DEBUG flag in Swift for SwiftTweaks
	    post_install do |installer|
	        installer.pods_project.targets.each do |target|
	            if target.name == 'Socket.IO-Client-Swift'
	                target.build_configurations.each do |config|
	                    if config.name == 'Debug'
	                        config.build_settings['SWIFT_VERSION'] = '4.0.0'
	                    end
	                end
	            end

							if target.name == 'Starscream'
	                target.build_configurations.each do |config|
	                    if config.name == 'Debug'
	                        config.build_settings['SWIFT_VERSION'] = '4.0.0'
	                    end
	                end
	            end
	        end
	    end
end
