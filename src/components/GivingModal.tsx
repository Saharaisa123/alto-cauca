import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { PaymentMethod, DonationTransaction } from '../types';
import { CHURCH_WALLET_ADDRESSES } from '../data/mockData';
import {
  X,
  CreditCard,
  QrCode,
  Building,
  CheckCircle2,
  Copy,
  Check,
  Shield,
  Lock,
  ArrowRight,
  Download,
  AlertCircle,
  Sparkles
} from 'lucide-react';

export const GivingModal: React.FC = () => {
  const {
    isGivingModalOpen,
    closeGivingModal,
    projects,
    selectedProjectId,
    submitDonation,
    t
  } = useChurch();

  const [projectId, setProjectId] = useState<string>(selectedProjectId || projects[0]?.id || 'proj-1');
  const [donationType, setDonationType] = useState<'onetime' | 'monthly'>('onetime');
  const [currency, setCurrency] = useState<'USD' | 'COP' | 'EUR' | 'MXN'>('USD');
  const [amount, setAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');

  // Payment tab
  const [paymentTab, setPaymentTab] = useState<PaymentMethod>('card');

  // Card fields
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');

  // Crypto fields
  const [selectedCrypto, setSelectedCrypto] = useState<'BTC' | 'ETH' | 'USDT_TRC20' | 'USDT_ERC20' | 'SOL'>('USDT_TRC20');
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [cryptoTxHash, setCryptoTxHash] = useState('');

  // Local bank method
  const [selectedLocalBank, setSelectedLocalBank] = useState<'PSE' | 'SPEI' | 'PIX' | 'ZELLE' | 'PAYPAL'>('PSE');

  // Flow states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [show3DSecureModal, setShow3DSecureModal] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [receipt, setReceipt] = useState<DonationTransaction | null>(null);

  if (!isGivingModalOpen) return null;

  const currentProject = projects.find(p => p.id === projectId) || projects[0];

  const presetAmounts: Record<string, number[]> = {
    USD: [25, 50, 100, 250, 500],
    EUR: [20, 45, 90, 220, 450],
    COP: [50000, 100000, 200000, 500000, 1000000],
    MXN: [300, 600, 1200, 2500, 5000]
  };

  const activeAmount = customAmount ? parseFloat(customAmount) || 0 : amount;

  // Approximate USD conversion for ledger
  const convertedUSD = (() => {
    if (currency === 'USD') return activeAmount;
    if (currency === 'EUR') return Math.round(activeAmount * 1.09);
    if (currency === 'COP') return Math.round(activeAmount / 4150);
    if (currency === 'MXN') return Math.round(activeAmount / 19.5);
    return activeAmount;
  })();

  const cryptoConversion: Record<string, number> = {
    BTC: Number((convertedUSD / 65000).toFixed(6)),
    ETH: Number((convertedUSD / 2650).toFixed(4)),
    USDT_TRC20: convertedUSD,
    USDT_ERC20: convertedUSD,
    SOL: Number((convertedUSD / 155).toFixed(3))
  };

  const currentCryptoAddress = CHURCH_WALLET_ADDRESSES[selectedCrypto];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentCryptoAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleInitiateDonation = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeAmount <= 0) {
      alert('Por favor especifica un monto válido para la ofrenda.');
      return;
    }

    if (paymentTab === 'card') {
      // Simulate 3D-Secure bank OTP verification
      setShow3DSecureModal(true);
    } else {
      processFinalDonation();
    }
  };

  const processFinalDonation = async () => {
    setIsSubmitting(true);
    setShow3DSecureModal(false);

    let paymentDetail = '';
    let txHash: string | undefined = undefined;

    if (paymentTab === 'card') {
      paymentDetail = `Tarjeta •••• ${cardNumber.slice(-4) || '8821'}`;
    } else if (paymentTab === 'crypto') {
      paymentDetail = `Cripto: ${selectedCrypto.replace('_', ' ')}`;
      txHash = cryptoTxHash.trim() || `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`;
    } else {
      paymentDetail = `Transferencia: ${selectedLocalBank}`;
    }

    try {
      const savedTx = await submitDonation({
        donorName: isAnonymous ? 'Donante Anónimo' : donorName.trim() || 'Feligrés Amigo',
        email: isAnonymous ? 'anonimo@reino.org' : donorEmail.trim() || 'donante@comunidad.org',
        amount: activeAmount,
        currency,
        convertedUSD,
        paymentMethod: paymentTab,
        paymentDetail,
        projectId: currentProject.id,
        projectTitle: currentProject.title,
        status: paymentTab === 'crypto' ? 'verified' : 'completed',
        txHash,
        anonymous: isAnonymous
      });

      setReceipt(savedTx);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-stone-900 text-white p-6 relative">
          <button
            onClick={closeGivingModal}
            className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 text-xs font-semibold mb-2">
            <Lock className="w-3.5 h-3.5" />
            <span>Pasarela Segura Cifrada con E2EE 256-bit</span>
          </div>

          <h3 className="text-2xl font-cinzel font-bold text-white">
            Sembrar en el Reino de Dios
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 mt-1">
            "Cada uno dé como propuso en su corazón: no con tristeza, ni por necesidad, porque Dios ama al dador alegre." — 2 Corintios 9:7
          </p>
        </div>

        {/* Content */}
        {!receipt ? (
          <form onSubmit={handleInitiateDonation} className="p-6 space-y-6">
            
            {/* Step 1: Project Allocation & Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Destino de la Ofrenda
                </label>
                <select
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  className="w-full text-xs sm:text-sm rounded-xl border border-stone-200 p-2.5 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Frecuencia
                </label>
                <div className="flex bg-stone-100 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setDonationType('onetime')}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      donationType === 'onetime'
                        ? 'bg-white text-stone-900 shadow-sm'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Ofrenda Única
                  </button>
                  <button
                    type="button"
                    onClick={() => setDonationType('monthly')}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      donationType === 'monthly'
                        ? 'bg-white text-stone-900 shadow-sm'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Pacto Mensual
                  </button>
                </div>
              </div>
            </div>

            {/* Step 2: Amount & Currency Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Monto a Sembrar
                </label>
                <div className="flex gap-1">
                  {(['USD', 'COP', 'EUR', 'MXN'] as const).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        setCurrency(c);
                        setCustomAmount('');
                        setAmount(presetAmounts[c][1]);
                      }}
                      className={`px-2 py-0.5 text-xs font-bold rounded ${
                        currency === c
                          ? 'bg-amber-700 text-white'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preset buttons */}
              <div className="grid grid-cols-5 gap-2 mb-3">
                {presetAmounts[currency].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => {
                      setAmount(preset);
                      setCustomAmount('');
                    }}
                    className={`py-2 text-xs sm:text-sm font-bold rounded-xl border transition-all ${
                      amount === preset && !customAmount
                        ? 'bg-amber-50 border-amber-600 text-amber-900 ring-2 ring-amber-600/20'
                        : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                    }`}
                  >
                    {preset.toLocaleString()}
                  </button>
                ))}
              </div>

              {/* Custom amount input */}
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-stone-400">
                  {currency === 'COP' || currency === 'MXN' || currency === 'USD' ? '$' : '€'}
                </span>
                <input
                  type="number"
                  placeholder="Otro monto personalizado..."
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full pl-8 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Step 3: Payment Method Tabs */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Método de Pago Seguro
              </label>

              <div className="grid grid-cols-3 gap-2 p-1 bg-stone-100 rounded-xl mb-4">
                <button
                  type="button"
                  onClick={() => setPaymentTab('card')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                    paymentTab === 'card'
                      ? 'bg-white text-stone-900 shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5 text-amber-700" />
                  <span>Tarjetas</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentTab('crypto')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                    paymentTab === 'crypto'
                      ? 'bg-white text-stone-900 shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <QrCode className="w-3.5 h-3.5 text-amber-700" />
                  <span>Cripto Web3</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentTab('bank')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                    paymentTab === 'bank'
                      ? 'bg-white text-stone-900 shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Building className="w-3.5 h-3.5 text-amber-700" />
                  <span>Local / PSE / PIX</span>
                </button>
              </div>

              {/* CARD FORM */}
              {paymentTab === 'card' && (
                <div className="space-y-3 p-4 rounded-2xl bg-stone-50 border border-stone-200">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                      Número de Tarjeta (Visa, Mastercard, Amex)
                    </label>
                    <input
                      type="text"
                      placeholder="4532 •••• •••• 8912"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      required
                      maxLength={19}
                      className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                        Fecha Expiración (MM/AA)
                      </label>
                      <input
                        type="text"
                        placeholder="12/28"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        required
                        maxLength={5}
                        className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                        Código de Seguridad (CVV)
                      </label>
                      <input
                        type="password"
                        placeholder="•••"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        required
                        maxLength={4}
                        className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                      Nombre en la Tarjeta
                    </label>
                    <input
                      type="text"
                      placeholder="Nombre del Titular"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      required
                      className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>
              )}

              {/* CRYPTO INTERFACE */}
              {paymentTab === 'crypto' && (
                <div className="space-y-4 p-4 rounded-2xl bg-stone-900 text-stone-100 border border-stone-800">
                  <div className="flex flex-wrap gap-1.5">
                    {(['USDT_TRC20', 'USDT_ERC20', 'BTC', 'ETH', 'SOL'] as const).map((cry) => (
                      <button
                        key={cry}
                        type="button"
                        onClick={() => setSelectedCrypto(cry)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                          selectedCrypto === cry
                            ? 'bg-amber-400 text-stone-950 font-bold'
                            : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                        }`}
                      >
                        {cry.replace('_', ' ')}
                      </button>
                    ))}
                  </div>

                  <div className="p-3.5 bg-stone-950 rounded-xl border border-stone-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-stone-400">Total a transferir:</span>
                      <p className="text-base font-bold text-amber-300 font-mono">
                        {cryptoConversion[selectedCrypto]} {selectedCrypto.split('_')[0]}
                      </p>
                    </div>
                    <span className="text-[11px] text-stone-400">≈ ${convertedUSD} USD</span>
                  </div>

                  {/* Public address with Copy button */}
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-400 mb-1">
                      Billetera Pública de la Iglesia:
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={currentCryptoAddress}
                        className="w-full text-[11px] px-3 py-2 rounded-xl border border-stone-800 bg-stone-950 text-stone-200 font-mono"
                      />
                      <button
                        type="button"
                        onClick={copyToClipboard}
                        className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0"
                      >
                        {copiedAddress ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedAddress ? 'Copiado' : 'Copiar'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Simulated TX Hash input */}
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-400 mb-1">
                      Hash de Transacción / TXID (Opcional para auditoría inmediata)
                    </label>
                    <input
                      type="text"
                      placeholder="0x9a8b7c... o dejar en blanco para autoverificación"
                      value={cryptoTxHash}
                      onChange={(e) => setCryptoTxHash(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-stone-800 bg-stone-950 text-stone-200 focus:outline-none font-mono"
                    />
                  </div>
                </div>
              )}

              {/* LOCAL BANK / WALLET (PSE / SPEI / PIX) */}
              {paymentTab === 'bank' && (
                <div className="space-y-3 p-4 rounded-2xl bg-stone-50 border border-stone-200">
                  <div className="grid grid-cols-3 gap-2">
                    {(['PSE', 'SPEI', 'PIX', 'ZELLE', 'PAYPAL'] as const).map((bk) => (
                      <button
                        key={bk}
                        type="button"
                        onClick={() => setSelectedLocalBank(bk)}
                        className={`p-2 rounded-xl border text-xs font-bold transition-all ${
                          selectedLocalBank === bk
                            ? 'bg-amber-100 border-amber-600 text-amber-900 shadow-sm'
                            : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
                        }`}
                      >
                        {bk}
                      </button>
                    ))}
                  </div>

                  <div className="text-xs text-stone-600 bg-white p-3.5 rounded-xl border border-stone-200 space-y-1">
                    <p><strong>Entidad Receptora:</strong> Iglesia del Dios Altísimo</p>
                    <p><strong>NIT / Identificación:</strong> 900.841.229-3</p>
                    <p><strong>Concepto:</strong> Ofrenda / Donación Social - {currentProject.title}</p>
                    <p className="text-[11px] text-stone-500 pt-1 border-t border-stone-100">
                      Serás redirigido a tu entidad financiera tras confirmar para debitar los {activeAmount} {currency}.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Step 4: Donor Details & Anonymous Toggle */}
            <div className="space-y-3 pt-2 border-t border-stone-200">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="anonymousCheck"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4 cursor-pointer"
                />
                <label htmlFor="anonymousCheck" className="text-xs font-medium text-stone-700 cursor-pointer">
                  Deseo que mi ofrenda sea anónima ("Que tu mano izquierda no sepa lo que hace tu derecha")
                </label>
              </div>

              {!isAnonymous && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Tu Nombre Completo"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    required={!isAnonymous}
                    className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                  <input
                    type="email"
                    placeholder="Correo Electrónico (para el recibo)"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    required={!isAnonymous}
                    className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-amber-700 hover:bg-amber-800 active:scale-[0.99] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>{t.giving.processing}</span>
                ) : (
                  <>
                    <Shield className="w-4 h-4 text-amber-300" />
                    <span>Ofrendar {activeAmount.toLocaleString()} {currency} de Forma Segura</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 mt-3 text-[11px] text-stone-500">
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.giving.securityNotice}</span>
              </div>
            </div>
          </form>
        ) : (
          /* Step 5: VERIFIABLE RECEIPT */
          <div className="p-6 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-2xl font-cinzel font-bold text-stone-900">
                ¡Ofrenda Recibida con Gratitud!
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-md mx-auto">
                Tu aporte ha sido registrado en la billetera y el libro de transparencia de la iglesia. Dios bendiga y multiplique tu generosidad.
              </p>
            </div>

            {/* Printable Receipt Card */}
            <div className="bg-stone-50 rounded-2xl border border-stone-200 p-5 text-left text-xs space-y-2.5 max-w-md mx-auto">
              <div className="flex justify-between border-b border-stone-200 pb-2">
                <span className="text-stone-500">Número de Recibo:</span>
                <strong className="font-mono text-stone-900">{receipt.receiptNumber}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Beneficiario / Proyecto:</span>
                <span className="font-semibold text-stone-900">{receipt.projectTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Monto Aportado:</span>
                <strong className="text-emerald-700 font-bold text-sm">
                  {receipt.amount.toLocaleString()} {receipt.currency} (${receipt.convertedUSD} USD)
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Método de Pago:</span>
                <span className="text-stone-800">{receipt.paymentDetail}</span>
              </div>
              {receipt.txHash && (
                <div className="flex justify-between">
                  <span className="text-stone-500">Hash Blockchain:</span>
                  <span className="font-mono text-[10px] text-amber-800">{receipt.txHash}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-stone-500">Fecha y Hora:</span>
                <span className="text-stone-800">{receipt.date}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-stone-200">
                <span className="text-stone-500">Estado de Auditoría:</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verificado y Asignado</span>
                </span>
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Imprimir Recibo</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setReceipt(null);
                  closeGivingModal();
                }}
                className="px-6 py-2 text-xs font-bold rounded-xl bg-amber-700 hover:bg-amber-800 text-white transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}

        {/* 3D SECURE MODAL SIMULATOR */}
        {show3DSecureModal && (
          <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-stone-300 text-center animate-in zoom-in-95">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-stone-900 text-base">
                Verificación Segura Bancaria (3D-Secure)
              </h4>
              <p className="text-xs text-stone-600 mt-1">
                Ingresa el código OTP enviado a tu móvil para autorizar la transacción de {activeAmount} {currency}:
              </p>

              <div className="my-4">
                <input
                  type="text"
                  placeholder="Código de 6 dígitos (ej. 842109)"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full text-center tracking-widest text-lg font-bold font-mono py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-[10px] text-stone-400 mt-1 block">
                  Simulación de seguridad bancaria activada
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShow3DSecureModal(false)}
                  className="flex-1 py-2 text-xs font-semibold rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={processFinalDonation}
                  className="flex-1 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Autorizar Pago
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
