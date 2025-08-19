
"use client"

import { useState, useRef, useEffect } from "react";
import { Bot, User, Send, RefreshCw, Loader2, ArrowDown, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PropertyCard } from "@/components/PropertyCard";
import { properties as allProperties } from "@/lib/data";
import { aiHousingAssistant } from "@/ai/flows/ai-housing-assistant";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type Message = {
    role: 'user' | 'model';
    content: string;
    recommendations?: { propertyId: number; reason: string }[];
};

export default function AIAssistantPage() {
    const [conversation, setConversation] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const [showScrollDown, setShowScrollDown] = useState(false);

    const startConversation = async (message: string = "Hello, I'm looking for a place to stay.") => {
        setIsLoading(true);
        try {
            const result = await aiHousingAssistant({ userMessage: message });
            setConversation([{ role: 'model', content: result.response }]);
        } catch (error) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to start conversation with AI assistant."
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        startConversation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const scrollToBottom = () => {
        chatContainerRef.current?.scrollTo({
            top: chatContainerRef.current.scrollHeight,
            behavior: "smooth",
        });
    };

    useEffect(() => {
       scrollToBottom();
    }, [conversation]);

    const handleScroll = () => {
        if (chatContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
            setShowScrollDown(scrollHeight > clientHeight && scrollHeight - scrollTop > clientHeight + 100);
        }
    };
    
    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { role: 'user', content: input };
        const newConversation = [...conversation, userMessage];
        setConversation(newConversation);
        setInput("");
        setIsLoading(true);

        try {
            const conversationHistory = conversation.map(msg => ({
                role: msg.role,
                content: msg.content
            }));
            const result = await aiHousingAssistant({
                 userMessage: input,
                 conversationHistory: conversationHistory,
            });
            const modelMessage: Message = { 
                role: 'model', 
                content: result.response, 
                recommendations: result.recommendations 
            };
            setConversation([...newConversation, modelMessage]);
        } catch (error) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Something went wrong. Please try again."
            });
            setConversation(conversation);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleFeedback = (feedback: 'good' | 'bad') => {
        const feedbackMessage = feedback === 'good' 
            ? "Thanks for the feedback! I'm glad I could help. Is there anything else you need?"
            : "I'm sorry these recommendations weren't a good fit. Could you tell me more about what you're looking for so I can try again?";
        
        const userMessage: Message = { role: 'user', content: `(User feedback: ${feedback})`};
        const modelMessage: Message = { role: 'model', content: feedbackMessage };
        setConversation(prev => [...prev, userMessage, modelMessage]);
    }

    const startOver = () => {
        setConversation([]);
        setInput("");
        startConversation();
    }

    return (
        <div className="container mx-auto py-8 h-[calc(100vh-10rem)] flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="text-3xl font-bold font-headline">AI Housing Assistant</h1>
                    <p className="text-muted-foreground">Your personal guide to finding the perfect home near FUD.</p>
                </div>
                <Button variant="outline" onClick={startOver} disabled={isLoading}>
                    <RefreshCw className="mr-2 h-4 w-4" /> Start Over
                </Button>
            </div>

            <Card className="flex-1 flex flex-col">
                <CardContent className="flex-1 p-0 flex flex-col">
                    <div ref={chatContainerRef} onScroll={handleScroll} className="flex-1 p-6 space-y-6 overflow-y-auto relative">
                        {conversation.map((msg, index) => (
                            <div key={index} className={cn("flex items-start gap-4", msg.role === 'user' ? 'justify-end' : '')}>
                                {msg.role === 'model' && (
                                    <Avatar>
                                        <AvatarFallback><Bot /></AvatarFallback>
                                    </Avatar>
                                )}
                                <div className={cn("max-w-2xl rounded-lg p-4", msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                                    <p className="whitespace-pre-wrap">{msg.content}</p>
                                    {msg.recommendations && msg.recommendations.length > 0 && (
                                        <div className="mt-4 space-y-4">
                                            <h4 className="font-semibold mb-2">Here are some properties I found for you:</h4>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {msg.recommendations.map(rec => {
                                                    const property = allProperties.find(p => p.id === rec.propertyId);
                                                    return property ? (
                                                        <div key={rec.propertyId}>
                                                            <Card className="bg-background/50">
                                                                <CardContent className="p-3">
                                                                <p className="text-sm text-muted-foreground italic border-l-4 border-accent pl-2 mb-2">
                                                                    <strong>Why it's a match:</strong> {rec.reason}
                                                                </p>
                                                                <PropertyCard property={property} />
                                                                </CardContent>
                                                            </Card>
                                                        </div>
                                                    ) : null;
                                                })}
                                            </div>
                                             <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                                                <p className="text-sm text-muted-foreground">Were these recommendations helpful?</p>
                                                <Button variant="outline" size="icon" onClick={() => handleFeedback('good')}>
                                                    <ThumbsUp className="h-4 w-4" />
                                                </Button>
                                                <Button variant="outline" size="icon" onClick={() => handleFeedback('bad')}>
                                                    <ThumbsDown className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {msg.role === 'user' && (
                                    <Avatar>
                                        <AvatarFallback><User /></AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        ))}
                         {isLoading && (
                            <div className="flex items-start gap-4">
                                <Avatar>
                                    <AvatarFallback><Bot /></AvatarFallback>
                                </Avatar>
                                <div className="max-w-xl rounded-lg p-4 bg-muted">
                                    <div className="flex items-center space-x-2">
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        <span>Thinking...</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        {showScrollDown && (
                            <Button
                                variant="outline"
                                size="icon"
                                className="absolute bottom-4 right-4 rounded-full"
                                onClick={scrollToBottom}
                            >
                                <ArrowDown className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                    <div className="p-4 border-t">
                        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Tell me what you're looking for..."
                                disabled={isLoading}
                                className="flex-1"
                            />
                            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                                <span className="sr-only">Send</span>
                            </Button>
                        </form>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
