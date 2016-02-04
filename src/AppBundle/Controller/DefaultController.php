<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

use Symfony\Component\HttpFoundation\JsonResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Response;

use AppBundle\Entity\Product;


class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        // replace this example code with whatever you need
        return $this->render('default/index.html.twig', array(
            'base_dir' => realpath($this->getParameter('kernel.root_dir').'/..'),
        ));
    }

    /**
     * @Route("/products", name="products")
     * @Method({"GET"})
     */
    public function productsAction(Request $request)
    {
        $repository = $this->getDoctrine()->getRepository('AppBundle:Product');
        $products = $repository->findAll();
        $serializer = $this->get('serializer');
        $json = $serializer->serialize($products, 'json');
        return new Response($json);
    }

    /**
     * @Route("/products", name="add_product")
     * @Method({"POST"})
     */
    public function addProductAction(Request $request)
    {
        $request->isXmlHttpRequest();
        $data = json_decode($request->getContent(), true);
        $request->request->replace($data);

        $form = $this->createFormBuilder(new Product(), array('csrf_protection' => false))
            ->add('name')
            ->add('price')
            ->add('description')
            ->getForm();
        
        $form->submit($data);
        
        if ($form->isValid()) {
            $product = new Product();
            $product->setName($request->request->get('name'));
            $product->setPrice($request->request->get('price'));
            $product->setDescription($request->request->get('description'));

            $em = $this->getDoctrine()->getManager();
            $em->persist($product);
            $em->flush();

            return new JsonResponse(['status' => 'OK']);
            
        } else {
            $errors = [];
            foreach ($form->getErrors(true) as $key => $error) {
                $errors[] = $error->getMessage();
            }

            return new JsonResponse(['status' => 'error', 'errors' => $errors], 422);
        }
    }

    /**
     * @Route("/products/{id}", name="get_product")
     * @Method({"GET"})
     */
    public function getProductAction(Request $request)
    {
        $repository = $this->getDoctrine()->getRepository('AppBundle:Product');
        $products = $repository->find($request->get('id'));
        $serializer = $this->get('serializer');
        $json = $serializer->serialize($products, 'json');
        return new Response($json);
    }
}
