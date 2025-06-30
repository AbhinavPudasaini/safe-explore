import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialLoginOptions = () => {
  const navigate = useNavigate();
  const [loadingProvider, setLoadingProvider] = useState(null);

  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      bgColor: 'bg-white',
      textColor: 'text-text-primary',
      borderColor: 'border-border'
    },
    {
      id: 'apple',
      name: 'Apple',
      icon: 'Apple',
      bgColor: 'bg-text-primary',
      textColor: 'text-white',
      borderColor: 'border-text-primary'
    }
  ];

  const handleSocialLogin = async (providerId) => {
    setLoadingProvider(providerId);
    
    // Simulate social login process
    setTimeout(() => {
      navigate('/personalized-dashboard');
      setLoadingProvider(null);
    }, 2000);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Divider */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-text-secondary font-caption">
            Or continue with
          </span>
        </div>
      </div>

      {/* Social Login Buttons */}
      <div className="space-y-3">
        {socialProviders.map((provider) => (
          <Button
            key={provider.id}
            variant="outline"
            size="lg"
            fullWidth
            onClick={() => handleSocialLogin(provider.id)}
            loading={loadingProvider === provider.id}
            disabled={loadingProvider !== null}
            className={`
              min-touch-target transition-smooth
              ${provider.bgColor} ${provider.textColor} ${provider.borderColor}
              hover:shadow-soft
            `}
          >
            <div className="flex items-center justify-center space-x-3">
              {loadingProvider === provider.id ? (
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Icon name={provider.icon} size={20} color="currentColor" />
              )}
              <span className="font-body">
                {loadingProvider === provider.id 
                  ? `Connecting to ${provider.name}...` 
                  : `Continue with ${provider.name}`
                }
              </span>
            </div>
          </Button>
        ))}
      </div>

      {/* Privacy Notice */}
      <div className="mt-6 p-4 bg-surface-100 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={16} color="var(--color-primary)" className="mt-0.5" />
          <div>
            <p className="text-xs font-caption text-text-secondary">
              Your privacy is protected. We use secure authentication and never store your social media passwords.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialLoginOptions;