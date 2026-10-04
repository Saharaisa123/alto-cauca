import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { PaymentMethod } from '../types';
import {
  X,
  Wallet,
  ShieldCheck,
  Download,
  Filter,
  ArrowUpRight,
  TrendingUp,
  Coins,
  CreditCard,
  Building,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';

export const ChurchWalletView: React.FC = () => {
  const {
    isWalletReportOpen,
    closeWalletReport,
    transactions,
    projects,
    t
  } = useChurch();

  const [filterMethod, setFilterMethod] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isWalletReportOpen) return null;

  // Calculate totals
  const totalUSDCollected = transactions.reduce((acc, tx) => acc + tx.convertedUSD, 0);

  // Breakdown by payment method
  const totalCryptoUSD = transactions
    .filter(t => t.paymentMethod === 'crypto')
    .reduce((acc, tx) => acc + tx.convertedUSD, 0);

  const totalCardUSD = transactions
    .filter(t => t.paymentMethod === 'card')
    .reduce((acc, tx) => acc + tx.convertedUSD, 0);

  const totalBankUSD = transactions
    .filter(t => t.paymentMethod === 'bank' || t.paymentMethod === 'wallet')
    .reduce((acc, tx) => acc + tx.convertedUSD, 0);

  const filteredTx = transactions.filter(tx => {
    const matchesMethod = filterMethod === 'all' || tx.paymentMethod === filterMethod;
    const matchesQuery =
      tx.donorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.receiptNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.projectTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMethod && matchesQuery;
  });

  const exportCSV = () => {
    const headers = ['Recibo', 'Fecha', 'Donante', 'Monto Original', 'Moneda', 'Equivalente USD', 'Metodo', 'Detalle', 'Proyecto', 'Estado', 'Hash'];
    const rows = transactions.map(tx => [
      tx.receiptNumber,
      tx.date,
      `"${tx.donorName}"`,
      tx.amount,
      tx.currency,
      tx.convertedUSD,
      tx.paymentMethod,
      `"${tx.paymentDetail}"`,
      `"${tx.projectTitle}"`,
      tx.status,
      tx.txHash || ''
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Auditoria_Billetera_Iglesia_Dios_Altisimo_${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-stone-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-stone-900 text-white p-6 relative">
          <button
            onClick={closeWalletReport}
            className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Auditoría Financiera Pública y Abierta</span>
          </div>

          <h3 className="text-2xl font-cinzel font-bold text-white">
            {t.giving.walletBalanceTitle}
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 mt-1">
            Gestión en tiempo real de todos los activos, transferencias y ofrendas recibidas con plena rendición de cuentas.
          </p>
        </div>

        {/* Dashboard Figures */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            
            {/* Total Balance */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
              <span className="text-xs text-amber-800 font-semibold block">Total Recaudado</span>
              <strong className="text-2xl font-bold text-stone-900 font-mono">
                ${totalUSDCollected.toLocaleString()} <span className="text-sm font-sans font-normal text-stone-500">USD</span>
              </strong>
              <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                <CheckCircle2 className="w-3 h-3" />
                <span>100% Auditado</span>
              </div>
            </div>

            {/* Crypto Assets */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
              <div className="flex items-center justify-between text-xs text-stone-600 mb-1">
                <span>Criptoactivos (Web3)</span>
                <Coins className="w-3.5 h-3.5 text-amber-600" />
              </div>
              <strong className="text-xl font-bold text-stone-900 font-mono">
                ${totalCryptoUSD.toLocaleString()} <span className="text-xs font-sans text-stone-500">USD</span>
              </strong>
              <p className="text-[10px] text-stone-500 mt-1">BTC, ETH, USDT en reservas</p>
            </div>

            {/* Cards */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
              <div className="flex items-center justify-between text-xs text-stone-600 mb-1">
                <span>Tarjetas Débito/Crédito</span>
                <CreditCard className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <strong className="text-xl font-bold text-stone-900 font-mono">
                ${totalCardUSD.toLocaleString()} <span className="text-xs font-sans text-stone-500">USD</span>
              </strong>
              <p className="text-[10px] text-stone-500 mt-1">Procesamiento seguro PCI-DSS</p>
            </div>

            {/* Bank / Wallets */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
              <div className="flex items-center justify-between text-xs text-stone-600 mb-1">
                <span>Bancario & Billeteras</span>
                <Building className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <strong className="text-xl font-bold text-stone-900 font-mono">
                ${totalBankUSD.toLocaleString()} <span className="text-xs font-sans text-stone-500">USD</span>
              </strong>
              <p className="text-[10px] text-stone-500 mt-1">PSE, SPEI, PIX y PayPal</p>
            </div>
          </div>

          {/* Allocation by Project */}
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
            <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-3">
              Ejecución Presupuestal por Causa Social
            </h4>
            <div className="space-y-2.5">
              {projects.map((proj) => {
                const percent = Math.min(100, Math.round((proj.currentAmount / proj.goalAmount) * 100));
                return (
                  <div key={proj.id} className="text-xs">
                    <div className="flex justify-between font-medium text-stone-800 mb-1">
                      <span>{proj.title}</span>
                      <span className="font-mono">${proj.currentAmount.toLocaleString()} / ${proj.goalAmount.toLocaleString()} USD ({percent}%)</span>
                    </div>
                    <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-600 rounded-full" style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Transactions Filter & Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl w-full sm:w-auto">
              {[
                { label: 'Todas', value: 'all' },
                { label: 'Tarjetas', value: 'card' },
                { label: 'Cripto', value: 'crypto' },
                { label: 'Bancos / PSE', value: 'bank' }
              ].map(f => (
                <button
                  key={f.value}
                  onClick={() => setFilterMethod(f.value)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                    filterMethod === f.value
                      ? 'bg-white text-stone-900 shadow-sm'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Buscar por recibo o donante..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-xs px-3 py-1.5 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 w-full sm:w-48"
              />

              <button
                type="button"
                onClick={exportCSV}
                className="px-3 py-1.5 text-xs font-bold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-xl flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700" />
                <span>Exportar CSV</span>
              </button>
            </div>
          </div>

          {/* Table of Transactions */}
          <div className="border border-stone-200 rounded-2xl overflow-hidden">
            <div className="max-h-64 overflow-y-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-100 text-stone-600 font-semibold sticky top-0 border-b border-stone-200">
                  <tr>
                    <th className="p-3">Recibo</th>
                    <th className="p-3">Fecha</th>
                    <th className="p-3">Donante</th>
                    <th className="p-3">Destino</th>
                    <th className="p-3">Método</th>
                    <th className="p-3 text-right">Monto</th>
                    <th className="p-3 text-center">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-mono text-[11px]">
                  {filteredTx.map((tx) => (
                    <tr key={tx.id} className="hover:bg-stone-50 transition-colors">
                      <td className="p-3 font-semibold text-stone-900">{tx.receiptNumber}</td>
                      <td className="p-3 text-stone-500">{tx.date}</td>
                      <td className="p-3 font-sans text-stone-800">{tx.donorName}</td>
                      <td className="p-3 font-sans text-stone-700 max-w-[150px] truncate">{tx.projectTitle}</td>
                      <td className="p-3 font-sans text-stone-600">
                        {tx.paymentDetail}
                        {tx.txHash && (
                          <span className="block text-[9px] text-amber-700 truncate max-w-[120px]">
                            {tx.txHash}
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-right font-bold text-stone-900">
                        ${tx.convertedUSD} USD
                      </td>
                      <td className="p-3 text-center">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-sans text-[10px] font-semibold border border-emerald-200">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          <span>Auditado</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 text-xs text-stone-500">
            <span>Mostrando {filteredTx.length} transacciones registradas</span>
            <button
              onClick={closeWalletReport}
              className="px-4 py-2 font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-xl"
            >
              Cerrar Informe
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
