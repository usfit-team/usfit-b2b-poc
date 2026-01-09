tailwind.config = {
    theme: {
        extend: {
            fontFamily: { sans: ['Inter', 'sans-serif'] },
            colors: {
                usfit: {
                    dark: '#111827',
                    cyan: '#22d3ee',
                    blue: '#3b82f6',
                    text: '#374151',
                    gray: '#F3F4F6'
                }
            },
            backgroundImage: {
                'usfit-gradient': 'linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)',
            },
            animation: {
                'scale-in': 'scaleIn 0.5s ease-out forwards',
                'fade-in': 'fadeIn 0.5s ease-out 0.3s forwards opacity-0'
            },
            keyframes: {
                scaleIn: {
                    '0%': { transform: 'scale(0)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        }
    }
}