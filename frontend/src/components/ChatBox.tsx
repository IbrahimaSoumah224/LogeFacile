import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Minimize2, Maximize2, X } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Bonjour ! Je suis votre assistant immobilier IA de LogeFacile. Comment puis-je vous aider aujourd'hui ?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulation d'une réponse IA
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    if (input.includes("location") || input.includes("louer")) {
      return "Je peux vous aider à trouver une location ! Quel type de bien recherchez-vous ? Appartement, maison ? Dans quelle ville ?";
    } else if (input.includes("achat") || input.includes("acheter")) {
      return "Excellent ! Pour un achat immobilier, j'ai besoin de connaître votre budget et vos critères. Quel est votre budget approximatif ?";
    } else if (input.includes("vente") || input.includes("vendre")) {
      return "Je peux vous accompagner dans la vente de votre bien. Pouvez-vous me décrire votre propriété ? Type, superficie, localisation ?";
    } else if (input.includes("prix") || input.includes("coût")) {
      return "Les prix varient selon la localisation et le type de bien. Pouvez-vous me préciser la zone géographique qui vous intéresse ?";
    } else if (input.includes("bonjour") || input.includes("salut")) {
      return "Bonjour ! Ravi de vous rencontrer. Je suis là pour vous aider avec tous vos projets immobiliers. Que puis-je faire pour vous ?";
    } else if (input.includes("conakry")) {
      return "Conakry est très demandé ! Préférez-vous le centre-ville ou les périphéries ?";
    } else if (input.includes("kankan")) {
      return "Kankan est une zone en développement, avez-vous une préférence entre neuf ou ancien ?";
    } else if (input.includes("boke")) {
      return "boke est une zone en développement, avez-vous une préférence entre neuf ou ancien ?";
    } else if (input.includes("kindia")) {
      return "kindia est une zone en développement, avez-vous une préférence entre neuf ou ancien ?";
    } else if (input.includes("kissidougou")) {
      return "kissidougou est une zone en développement, avez-vous une préférence entre neuf ou ancien ?";
    } else if (input.includes("faranah")) {
      return "faranah est une zone en développement, avez-vous une préférence entre neuf ou ancien ?";
    } else if (input.includes("N'zerekore")) {
      return "N'zerekore est une zone en développement, avez-vous une préférence entre neuf ou ancien ?";
    } else if (input.includes("Macenta")) {
      return "Macenta est une zone en développement, avez-vous une préférence entre neuf ou ancien ?";
    } else if (input.includes("Lola")) {
      return "Lola est une zone en développement, avez-vous une préférence entre neuf ou ancien ?";
    } else if (input.includes("siguiri")) {
      return "siguiri est une zone en développement, avez-vous une préférence entre neuf ou ancien ?";
    } else if (input.includes("bofa")) {
      return "bofa est une zone en développement, avez-vous une préférence entre neuf ou ancien ?";
    } else if (input.includes("labe")) {
      return "labe est une zone en développement, avez-vous une préférence entre neuf ou ancien ?";
    } else if (input.includes("mamou")) {
      return "mamou est une zone en développement, avez-vous une préférence entre neuf ou ancien ?";
    } else if (input.includes("mamou")) {
      return "mamou est une zone en développement, avez-vous une préférence entre neuf ou ancien ?";
    } else if (input.includes("dabola")) {
      return "dabola est une zone en développement, avez-vous une préférence entre neuf ou ancien ?";
    } else if (input.includes("kassa")) {
      return "kassa est une zone en développement, avez-vous une préférence entre neuf ou ancien ?";
    } else if (input.includes("appartement")) {
      return "Cherchez-vous un appartement meublé ou non meublé ?";
    } else if (input.includes("maison")) {
      return "Quel type de maison ? Villa, bungalow ou habitation traditionnelle ?";
    } else if (input.includes("terrain")) {
      return "Avez-vous une idée de la superficie souhaitée pour le terrain ?";
    } else if (input.includes("agence")) {
      return "Souhaitez-vous être mis en contact avec une agence immobilière locale ?";
    } else if (input.includes("notaire")) {
      return "Je peux vous guider pour trouver un notaire en Guinée pour sécuriser votre transaction.";
    } else if (input.includes("crédit immobilier") || input.includes("prêt")) {
      return "Cherchez-vous des informations sur les prêts immobiliers disponibles en Guinée ?";
    } else if (input.includes("bail")) {
      return "Pour le contrat de bail, je peux vous fournir un modèle standard guinéen.";
    } else if (input.includes("garantie") || input.includes("caution")) {
      return "La garantie locative est souvent équivalente à un ou deux mois de loyer.";
    } else if (input.includes("construction")) {
      return "Souhaitez-vous des contacts d'entrepreneurs ou conseils pour construire ?";
    } else if (input.includes("urbanisme")) {
      return "Connaissez-vous les règles d'urbanisme en vigueur pour votre projet ?";
    } else if (input.includes("taxe") || input.includes("impôt")) {
      return "Je peux vous renseigner sur la fiscalité applicable aux biens immobiliers en Guinée.";
    } else if (input.includes("colocation")) {
      return "Cherchez-vous une colocation ou souhaitez-vous mettre un bien en colocation ?";
    } else if (input.includes("investissement")) {
      return "Voulez-vous des conseils sur l'investissement immobilier rentable en Guinée ?";
    } else if (input.includes("marché")) {
      return "Le marché immobilier guinéen est en croissance, cherchez-vous une estimation précise ?";
    } else if (input.includes("contrat")) {
      return "Le contrat de vente ou de location doit être clair. Souhaitez-vous un modèle standard ?";
    } else if (input.includes("diagnostic")) {
      return "Les diagnostics immobiliers sont obligatoires avant une vente. Avez-vous besoin d'informations ?";
    } else if (input.includes("agriculture")) {
      return "Vous cherchez un terrain agricole ? Quelle superficie vous intéresse ?";
    } else if (input.includes("commercial")) {
      return "Besoin d'un local commercial ? Précisez la zone et la superficie souhaitée.";
    } else if (input.includes("chauffage")) {
      return "Quel type de chauffage privilégiez-vous pour votre logement ?";
    } else if (input.includes("électricité")) {
      return "Souhaitez-vous des informations sur les raccordements électriques immobiliers ?";
    } else if (input.includes("eau")) {
      return "L'accès à l'eau potable est essentiel. Votre bien en dispose-t-il déjà ?";
    } else if (input.includes("école") || input.includes("éducation")) {
      return "Cherchez-vous un bien proche d'écoles ou d'universités ?";
    } else if (input.includes("sécurité")) {
      return "La sécurité est importante. Préférez-vous un quartier avec gardiennage ou résidence fermée ?";
    } else if (input.includes("meublé")) {
      return "Souhaitez-vous un logement meublé ou non meublé ?";
    } else if (input.includes("propriété")) {
      return "Possédez-vous déjà une propriété ? Cherchez-vous à la vendre ou à en acheter une nouvelle ?";
    } else if (input.includes("immeuble")) {
      return "Recherchez-vous un immeuble entier ou des lots dans un immeuble ?";
    } else if (
      input.includes("financement participatif") ||
      input.includes("crowdfunding")
    ) {
      return "Voulez-vous en savoir plus sur le financement participatif immobilier ?";
    } else if (input.includes("colonie") || input.includes("villa")) {
      return "Pour une villa, avez-vous une préférence pour style moderne ou traditionnel ?";
    } else if (input.includes("accessibilité")) {
      return "L'accessibilité aux transports en commun est-elle un critère pour vous ?";
    } else if (input.includes("artisan")) {
      return "Avez-vous besoin d'artisans locaux pour des réparations ou améliorations ?";
    } else if (input.includes("location saisonnière")) {
      return "Cherchez-vous à mettre un bien en location saisonnière, type vacances ?";
    } else if (input.includes("architecture")) {
      return "Intéressé par un style architectural particulier ? Moderne, colonial, local ?";
    } else if (input.includes("mutation")) {
      return "Besoin d’informations sur la mutation de propriété immobilière en Guinée ?";
    } else if (input.includes("marché noir")) {
      return "Attention aux pratiques du marché noir. Souhaitez-vous des conseils pour éviter les arnaques ?";
    } else {
      return "C'est une excellente question ! Je peux vous aider avec la location, l'achat, la vente de biens immobiliers, ou vous donner des informations sur les prix du marché. Que souhaitez-vous savoir ?";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
        >
          <Bot className="w-6 h-6" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col z-40">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-emerald-600 text-white rounded-t-xl">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Assistant IA LogeFacile</h3>
            <p className="text-xs text-emerald-100">En ligne</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1 hover:bg-emerald-500 rounded transition-colors duration-200"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === "user"
                  ? "bg-emerald-600 text-white rounded-br-sm"
                  : "bg-gray-100 text-gray-800 rounded-bl-sm"
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.sender === "bot" && (
                  <Bot className="w-4 h-4 mt-0.5 text-emerald-600" />
                )}
                <div className="flex-1">
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === "user"
                        ? "text-emerald-100"
                        : "text-gray-500"
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
                {message.sender === "user" && (
                  <User className="w-4 h-4 mt-0.5 text-emerald-100" />
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 p-3 rounded-lg rounded-bl-sm max-w-[80%]">
              <div className="flex items-center space-x-2">
                <Bot className="w-4 h-4 text-emerald-600" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-end space-x-2">
          <div className="flex-1">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tapez votre message..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
              rows={1}
              style={{ minHeight: "44px", maxHeight: "100px" }}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="p-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Appuyez sur Entrée pour envoyer
        </p>
      </div>
    </div>
  );
};

export default ChatBox;
