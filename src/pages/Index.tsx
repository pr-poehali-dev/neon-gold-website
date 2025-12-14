import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';

const CORRECT_CODE = 'CFGERL5S';

const Index = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [code, setCode] = useState('');
  const [showInstructions, setShowInstructions] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showSignal, setShowSignal] = useState(false);
  const [coefficient, setCoefficient] = useState('');
  const [canGetSignal, setCanGetSignal] = useState(true);
  const [countdown, setCountdown] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !canGetSignal) {
      setCanGetSignal(true);
    }
  }, [countdown, canGetSignal]);

  const handleCodeSubmit = () => {
    if (code === CORRECT_CODE) {
      setIsAuthorized(true);
    }
  };

  const generateCoefficient = () => {
    const random = Math.random();
    let coef;
    
    if (random < 0.6) {
      coef = (1 + Math.random() * 14).toFixed(2);
    } else if (random < 0.9) {
      coef = (15 + Math.random() * 5).toFixed(2);
    } else {
      coef = (20 + Math.random() * 30).toFixed(2);
    }
    
    return coef;
  };

  const handleGetSignal = () => {
    if (canGetSignal) {
      const newCoef = generateCoefficient();
      setCoefficient(newCoef);
      setShowSignal(true);
      setCanGetSignal(false);
      setCountdown(60);
    }
  };

  const handleRegister = () => {
    window.open('https://t.me/X_Quill_Bot/app?startapp=eHd1PTE3MDQwMjgzNzcmbT1uZXRsbzU1NSZjPWRlZmF1bHQ', '_blank');
  };

  const handleSupport = () => {
    window.open('https://t.me/Lusky_bear_help_bot', '_blank');
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-zinc-900 p-4">
        <Card className="w-full max-w-md p-8 bg-zinc-900/50 backdrop-blur border-2 border-primary/30 neon-border">
          <div className="text-center space-y-6">
            <h1 className="text-5xl font-black text-primary neon-glow mb-8">LUSKY BEAR</h1>
            <div className="space-y-4">
              <p className="text-lg text-foreground/90">Введите бонус-код для входа</p>
              <Input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="Введите код"
                className="text-center text-xl tracking-widest bg-black/50 border-primary/50 text-primary placeholder:text-primary/30 focus:border-primary focus:ring-primary"
                onKeyPress={(e) => e.key === 'Enter' && handleCodeSubmit()}
              />
              <Button
                onClick={handleCodeSubmit}
                className="w-full bg-primary hover:bg-primary/90 text-black font-bold text-lg py-6 neon-button"
              >
                Войти
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black p-4 flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-6xl font-black text-center text-primary neon-glow mb-12">LUSKY BEAR</h1>
        
        {currentSlide === 0 && (
          <div className="space-y-4 animate-fade-in">
            <Button
              onClick={() => setShowInfo(true)}
              className="w-full bg-zinc-800 hover:bg-zinc-700 text-primary font-semibold text-lg py-6 border-2 border-primary/30 neon-border transition-all"
            >
              Инструкция
            </Button>

            <Button
              onClick={handleSupport}
              className="w-full bg-zinc-800 hover:bg-zinc-700 text-primary font-semibold text-lg py-6 border-2 border-primary/30 neon-border transition-all"
            >
              Поддержка
            </Button>

            <Button
              onClick={() => setCurrentSlide(1)}
              className="w-full bg-primary/20 hover:bg-primary/30 text-primary font-semibold text-lg py-6 border-2 border-primary/30 neon-border transition-all mt-8"
            >
              Далее →
            </Button>
          </div>
        )}

        {currentSlide === 1 && (
          <div className="space-y-4 animate-fade-in">
            <Button
              onClick={() => setShowInstructions(true)}
              className="w-full bg-primary hover:bg-primary/90 text-black font-bold text-xl py-8 neon-button transition-all"
            >
              👑 VIP сигналы
            </Button>

            <Button
              onClick={handleRegister}
              className="w-full bg-gradient-to-r from-primary to-yellow-500 hover:from-yellow-500 hover:to-primary text-black font-bold text-xl py-8 neon-button transition-all"
            >
              Зарегистрироваться
            </Button>

            <Button
              onClick={handleGetSignal}
              disabled={!canGetSignal}
              className="w-full bg-primary hover:bg-primary/90 text-black font-bold text-xl py-8 neon-button transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {canGetSignal ? '👑 Получить VIP сигнал' : `Ожидание ${countdown}с`}
            </Button>

            <Button
              onClick={() => setCurrentSlide(0)}
              className="w-full bg-zinc-800/50 hover:bg-zinc-700/50 text-primary/70 font-semibold text-lg py-6 border-2 border-primary/20 transition-all mt-8"
            >
              ← Назад
            </Button>
          </div>
        )}
      </div>

      <Dialog open={showInstructions} onOpenChange={setShowInstructions}>
        <DialogContent className="bg-zinc-900 border-2 border-primary/50 text-foreground max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary neon-glow text-center">
              ⚡Инструкция для правильной работы⚡
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-foreground/90 text-base leading-relaxed">
            <p className="flex items-start gap-2">
              <span className="text-xl">🚀</span>
              <span><strong>1.</strong> Регистрируем совершенно новый аккаунт.</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-xl">🔥</span>
              <span><strong>2.</strong> Вам дают бесплатный бонус виде 50 рублей, и вводим по желанию сверху промокод.</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-xl">👑</span>
              <span><strong>3.</strong> Дальше пополняем баланс на любую сумму при желании, можно играть и на бонус но в этом случае казино будет вас сливать.</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-xl">🌟</span>
              <span><strong>4.</strong> Заходим в игру Tower Rush и ставим 2 раза ставку это нужно чтобы казино увидел что вы не бот.</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-xl">🎰</span>
              <span><strong>5.</strong> Дальше заходим в игру CRASH X и нажимаем получить VIP сигнал👑</span>
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showInfo} onOpenChange={setShowInfo}>
        <DialogContent className="bg-zinc-900 border-2 border-primary/50 text-foreground max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary neon-glow text-center">
              Информация
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-foreground/90 text-base leading-relaxed">
            <p className="flex items-start gap-2">
              <span className="text-xl">🚀</span>
              <span>Бот использует ИИ для анализа, вычета, и группировки следующего коэффициента, бот онлайн постоянно анализирует ставки.</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-xl">📢</span>
              <span>Точность бота 97%, в некоторых случаях бот ошибается и выдает не правильный коэффициент победы.</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-xl">🍀</span>
              <span>Если возникнут вопросы/проблемы с ботом, обращайтесь в поддержку.</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-xl">🎰</span>
              <span>Удачных ставок.</span>
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showSignal} onOpenChange={setShowSignal}>
        <DialogContent className="bg-zinc-900 border-2 border-primary/50 text-foreground max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary neon-glow text-center">
              👑 VIP Сигнал
            </DialogTitle>
          </DialogHeader>
          <div className="py-8 text-center">
            <div className="text-7xl font-black text-primary neon-glow animate-pulse">
              {coefficient}x
            </div>
            <p className="mt-6 text-foreground/70 text-lg">Используйте этот коэффициент в игре CRASH X</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;