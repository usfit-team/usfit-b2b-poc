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
            }
        }
    }
}