'use client';

interface WhatsAppButtonProps {
  phoneNumber: string;
  productName: string;
  variant?: 'solid' | 'outline';
}

export default function WhatsAppButton({ phoneNumber, productName, variant = 'solid' }: WhatsAppButtonProps) {
  const handleWhatsAppClick = () => {
    const message = `Hi! I'm interested in ${productName}. Can you please provide more information?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className={`flex items-center justify-center gap-2 px-6 py-2 rounded-full font-semibold transition-colors ${
        variant === 'solid'
          ? 'bg-green-500 text-white hover:bg-green-600'
          : 'border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white'
      }`}
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.588 2.034.898 3.149.899 3.18 0 5.766-2.587 5.766-5.767 0-3.18-2.586-5.767-5.766-5.767zm0 10.305c-1.049 0-2.078-.285-2.97-.822l-.212-.125-1.316.346.352-1.274-.137-.216c-.518-.828-.791-1.77-.792-2.732 0-2.657 2.162-4.819 4.822-4.819 2.66 0 4.822 2.162 4.822 4.819 0 2.659-2.162 4.822-4.822 4.822zm2.636-3.95c-.144-.072-.852-.421-.984-.469-.132-.048-.228-.072-.324.072-.096.144-.372.469-.456.565-.084.096-.168.108-.312.036-.144-.072-.608-.224-1.158-.714-.426-.38-.714-.85-.798-1.053-.084-.204-.012-.3.064-.384s.144-.156.192-.24c.048-.084.072-.144.108-.24.036-.096.018-.18-.012-.252-.03-.072-.324-.78-.444-1.068-.108-.264-.216-.228-.3-.24-.084-.012-.18-.012-.276-.012-.096 0-.252.036-.384.18-.132.144-.504.492-.504 1.2 0 .708.516 1.392.588 1.488.072.096.996 1.596 2.448 2.244 1.452.648 1.452.432 1.716.396s.9-.372 1.02-.732c.12-.36.12-.672.084-.732-.036-.06-.132-.096-.264-.168z"/>
      </svg>
      Inquire on WhatsApp
    </button>
  );
}